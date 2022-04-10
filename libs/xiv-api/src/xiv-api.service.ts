import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class XivApiService {
  async getTotalItems() {
    const items = await axios.get('https://xivapi.com/item');
    return items.data.Pagination.ResultsTotal;
  }
  async getTotalPages() {
    const totalItems = await this.getTotalItems();
    return Math.ceil(totalItems / 3000);
  }

  async getItemsIdsPerPage(page: number): Promise<number[]> {
    const response = await axios.get(
      `https://xivapi.com/item?page=${page}&limit=3000`,
    );
    return response.data.Results.map((item) => item.ID);
  }

  async getAllItemsIds() {
    const totalPages = await this.getTotalPages();
    const itens = await Promise.all(
      [...Array(totalPages).keys()].map((page) =>
        this.getItemsIdsPerPage(page + 1),
      ),
    );
    return itens.reduce((acc, item) => [...acc, ...item], []);
  }

  async getItemDetail(id: number) {
    const response = await axios.get(
      `https://xivapi.com/item/${id}?columns=ID,Name,Description,GameContentLinks.GilShopItem`,
    );
    return response.data;
  }
}
