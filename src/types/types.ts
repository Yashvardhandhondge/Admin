import type { Moment } from "moment";

export interface FormValues {
  title: string;
  description: string;
  url: string;
  keywords: string;
  canonicalUrl: string;
  offerTitle: string;
  offerType: string;
  airline: string;
  offerStartDate: Moment | null;
  offerEndDate: Moment | null;
  travelStartDate: Moment | null;
  travelEndDate: Moment | null;
  discountDescription: string;
  cancellationPolicy: string;
  termsAndCondition: string;
  banner: File | null;
  thumbnail: File | null;
  offerTypeId: number;
  offerTypeName: string;
  airlineId: number;
  cityId: number;
  other: string;
  bannerUrl: string;
  discountDesc: string;
  termsConditions: string;
  thumbnailUrl: string;
  sessionId: string;
  createId: number;
  isActive: string;
  services: Array<{ service: string; minBooking: number; discount: string }>;
}
