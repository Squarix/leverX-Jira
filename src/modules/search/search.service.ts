import {Injectable, Logger} from "@nestjs/common";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {Task} from "../tasks/task.entity";
import {Project} from "../projects/project.entity";
import Any = jasmine.Any;

@Injectable()
export class SearchService {
  constructor(private readonly elasticService: ElasticsearchService) {
  }

  private readonly logger = new Logger();

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
    this.logger.log(this.elasticService.count({index: indexName, type: type}));
  }

  public async searchProjects(query: string) {
    let result = [];
    let byName = this.elasticService.search({
      index: 'projects',
      type: 'project',
      body: {
        query: {
          match: {name: query}
        }
      }
    });
    await byName.forEach((res) => {
      res[0].hits.hits.forEach((hit) => {
        result.push(hit._source);
      });
    });

    return this.getUnique(result, 'id');
  }

  public async searchTasks(query: string) {
    let result = [];
    let byDescription = this.elasticService.search({
      index: 'tasks',
      type: 'task',
      body: {
        query: {
          match: {description: query}
        }
      }
    });
    await byDescription.forEach((res) => {
      res[0].hits.hits.forEach((hit) => {
        result.push(hit._source);
      });
    });
    let byTitle = this.elasticService.search({
      index: 'tasks',
      type: 'task',
      body: {
        query: {
          match: {title: query}
        }
      }
    });
    await byTitle.forEach((res) => {
      res[0].hits.hits.forEach((hit) => {
        result.push(hit._source);
      });
    });

    return this.getUnique(result, 'id');
  }


  private getUnique(arr, comp): Array<any> {

    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  }
}