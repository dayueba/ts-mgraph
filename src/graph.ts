type Vertex = {
  _id?: number;
  _in?: Edge[];
  _out?: Edge[];
};

type Edge = {
  _in: Vertex;
  _out: Vertex;
};

export class Graph {
  autoid: number; // 自增id
  edges: Edge[];
  vertices: Vertex[];
  vertexIndex: Map<number, Vertex>;

  constructor() {
    this.edges = [];
    this.vertices = [];
    this.vertexIndex = new Map<number, Vertex>();
    this.autoid = 1;
  }

  addVertices(V: Vertex[]) {
    V.forEach(v => {
      this.addVertex(v);
    });
  }
  addEdges(E: Edge[]) {
    E.forEach(e => {
      this.addEdge(e);
    });
  }

  addVertex(vertex: Vertex) {
    if (!vertex._id) {
      vertex._id = this.autoid++;
    } else if (this.findVertexById(vertex._id)) {
      throw new Error('id 不能重复');
    }

    this.vertices.push(vertex);
    this.vertexIndex.set(vertex._id, vertex);
    vertex._out = [];
    vertex._in = [];
    return vertex._id;
  }

  addEdge(edge: Edge) {
    edge._in = this.findVertex(edge._in);
    edge._out = this.findVertex(edge._out);

    if (!edge._in || !edge._out) {
      throw new Error('无法形成边');
    }

    edge._out._out.push(edge);
    edge._in._in.push(edge);

    this.edges.push(edge);
  }

  findVertexById(id: number): Vertex {
    return this.vertexIndex.get(id);
  }

  findVertex(vertex: Vertex): Vertex {
    return this.vertexIndex.get(vertex._id);
  }

  v() {
    var query = Dagoba.query(this);
    query.add('vertex', [].slice.call(arguments)); // add a step to our program
    return query;
  }
}

const graph = new Graph();
graph.addVertices([{ _id: 1 }, { _id: 2 }]);
graph.addEdges([{ _in: { _id: 1 }, _out: { _id: 2 } }]);
