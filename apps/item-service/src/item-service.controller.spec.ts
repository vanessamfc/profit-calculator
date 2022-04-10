import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryModule } from '@repo/repository';
import { ItemServiceController } from './item-service.controller';
import { ItemServiceService } from './item-service.service';

describe('ItemServiceController', () => {
  let itemServiceController: ItemServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      controllers: [ItemServiceController],
      providers: [ItemServiceService],
    }).compile();

    itemServiceController = app.get<ItemServiceController>(
      ItemServiceController,
    );
  });

  describe('root', () => {
    it('should get a item', async () => {
      const item = await itemServiceController.getItem('14');
      console.log(item);
      expect(item).toHaveProperty('_id');
      expect(item).toMatchObject({
        Name: 'Fire Cluster',
      });
    });
  });
});
