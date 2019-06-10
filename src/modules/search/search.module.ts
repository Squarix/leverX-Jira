import {Module} from "@nestjs/common";
import {ElasticsearchModule} from "@nestjs/elasticsearch";
import {SearchService} from "./search.service";

@Module({
  providers: [SearchService],
  imports: [ElasticsearchModule.register({
    host: 'localhost:9200',
    log: 'trace'
  }),],
})

export class SearchModule {

}