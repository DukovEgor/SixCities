import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offers } from '../types/offer';

export const setCity = createAction<City>('setCity');
export const getOffers = createAction<Offers>('getOffers');
