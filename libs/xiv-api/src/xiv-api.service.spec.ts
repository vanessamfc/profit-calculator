import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { XivApiService } from './xiv-api.service';

describe('XivApiService', () => {
  let service: XivApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XivApiService],
    }).compile();

    service = module.get<XivApiService>(XivApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the total number of items', async () => {
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(async () => ({
        data: { Pagination: { ResultsTotal: 36700 } },
      }));
    const totalItems = await service.getTotalItems();
    expect(totalItems).toBe(36700);
    expect(axiosSpy).toBeCalledTimes(1);
    expect(axiosSpy).toHaveBeenNthCalledWith(1, 'https://xivapi.com/item');
  });
  it('should return the total number of items', async () => {
    const getTotalItemsSpy = jest
      .spyOn(service, 'getTotalItems')
      .mockImplementationOnce(async () => 36700);
    const totalPages = await service.getTotalPages();
    expect(totalPages).toBe(13);
    expect(getTotalItemsSpy).toBeCalledTimes(1);
  });

  it('should return the total number of items', async () => {
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockImplementationOnce(async () => ({
        data: { Results: [{ ID: 1 }, { ID: 2 }, { ID: 3 }] },
      }));
    const totalPages = await service.getItemsIdsPerPage(1);
    expect(totalPages.length).toBe(3);
    expect(totalPages).toStrictEqual([1, 2, 3]);
    expect(axiosSpy).toBeCalledTimes(1);
    expect(axiosSpy).toHaveBeenNthCalledWith(
      1,
      'https://xivapi.com/item?page=1&limit=3000',
    );
  });

  it('should return the total number of items', async () => {
    const getTotalPagesSpy = jest
      .spyOn(service, 'getTotalPages')
      .mockImplementationOnce(async () => 3);
    const getItemsIdsPerPageSpy = jest
      .spyOn(service, 'getItemsIdsPerPage')
      .mockImplementation(async () => [1, 2, 3]);
    const itemsIds = await service.getAllItemsIds();
    expect(itemsIds).toStrictEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
    expect(getTotalPagesSpy).toBeCalledTimes(1);
    expect(getItemsIdsPerPageSpy).toBeCalledTimes(3);
    expect(getItemsIdsPerPageSpy).toHaveBeenNthCalledWith(1, 1);
    expect(getItemsIdsPerPageSpy).toHaveBeenNthCalledWith(2, 2);
    expect(getItemsIdsPerPageSpy).toHaveBeenNthCalledWith(3, 3);
  });
});
