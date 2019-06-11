import {Module} from "@nestjs/common";
import {ElasticsearchModule} from "@nestjs/elasticsearch";
import {SearchService} from "./search.service";
import {SearchController} from "./search.controller";

@Module({
  providers: [SearchService],
  controllers: [SearchController],
  imports: [ElasticsearchModule.register({
    host: 'localhost:9200',
    log: 'trace'
  }),],
})

export class SearchModule {

}