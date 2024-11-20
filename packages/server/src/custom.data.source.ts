import { DataSource } from 'typeorm';

export class CustomDataSource extends DataSource {
  public async buildMetadatas(): Promise<void> {
    super.buildMetadatas();
  }
}
