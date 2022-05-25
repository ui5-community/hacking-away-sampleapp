using ui5con.hacking.away.sample as sample from '../db/data-model';

service CatalogService {
    entity Todos as projection on sample.Todos;
}