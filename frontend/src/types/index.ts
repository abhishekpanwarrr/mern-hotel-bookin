export interface HotelType {
  _id: string;
  hotelName: string;
  price?: number;
  description: string;
  address: string;
  imageUrl: string;
  extraImages: Array<string>;
  policies: Array<string>;
  timing: Array<object>;
  ameneties: Array<object>;
  roomType: Array<{
    deluxe?: number,
    simple?: number
  }>;
  ratings: Array<object>;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
