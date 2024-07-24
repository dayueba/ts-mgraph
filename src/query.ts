import { Graph } from './graph';

export class Query {
  graph: Graph;
  state: any[]; // 每一步的状态
  program: any[]; // 步骤清单
  gremlins: any[]; //每个步骤的小问题

  constructor(graph: Graph) {
    this.graph = graph;
    this.state = [];
    this.program = [];
    this.gremlins = [];
  }

  add(pipetype, args) {
    const step = [pipetype, args];
    this.program.push(step); // step is a pair of pipetype and its args
    return this;
  }
}
