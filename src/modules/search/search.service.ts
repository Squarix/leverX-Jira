import {Injectable, Logger} from "@nestjs/common";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {Task} from "../tasks/task.entity";
import {start} from "repl";
import {response} from "express";
import {Project} from "../projects/project.entity";
import Any = jasmine.Any;

@Injectable()
export class SearchService {
  constructor(private readonly elasticService:ElasticsearchService) {}

  private readonly logger = new Logger();

  public async ping() {
    this.elasticService.ping({
      requestTimeout: 3000
    });
    this.elasticService.bulk({})
  }

  public async taskIndex(task: Task) {
    let bulk = this.bulk('tasks', 'task', task);
    return await this.elasticService.getClient().bulk({
      body: bulk,
      index: 'tasks',
      type: 'task'
    });
  }

  public async projectIndex(project: Project) {
    let bulk = this.bulk('projects', 'project', project);
    return await this.elasticService.getClient().bulk({
      body: bulk,
      index: 'projects',
      type: 'project'
    });
  }

  private bulk(index: string, type: string, generic): Array<Any> {
    const bulk = [];
    bulk.push({index: {_index: index, _type: type}});
    bulk.push(generic);
    return bulk;
  }

  public async countIndex(indexName: string, type: string) {
    this.logger.log(this.elasticService.count({ index: indexName, type: type}));
  }

  public async searchTasks() {
    let response = this.elasticService.search({
      index: 'tasks',
      type: 'task',
      body: {
        query: {
          match: { description: 'Помогите сделать матешу' }
        }
      }
    });
    response.forEach((res) => {
      res[0].hits.hits.forEach((hit) => {
        this.logger.log(hit);
      });
    });
  }
}