export interface HotelType {
    _id: string;
    hotelName: string;
    description: string;
    address: string;
    imageUrl: string;
    extraImages: Array<string>;
    policies: Array<string>;
    timing: Array<object>;
    ameneties: Array<object>;
    roomType: Array<object>;
    ratings: Array<object>;
    createdAt: string;
    updatedAt: string;
    __v: string;
  }