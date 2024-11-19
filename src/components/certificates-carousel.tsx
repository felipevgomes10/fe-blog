"use client";

import type { MappedCertificate } from "@/http/mappers/experiences-mapper/experiences-mapper";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

type CertificatesCarouselProps = {
  certificates: MappedCertificate[];
};

export function CertificatesCarousel({
  certificates,
}: Readonly<CertificatesCarouselProps>) {
  return (
    <div className="not-prose sm:max-w-auto mx-auto w-full max-w-64 sm:mx-0 carousel-md:max-w-full">
      <Carousel
        className="w-full"
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 2000 })]} // Autoplay every 2 seconds
      >
        <CarouselContent>
          {React.Children.toArray(
            certificates.map(({ name, imageUrl, certificateUrl }) => (
              <CarouselItem className="carousel-md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square overflow-hidden rounded-md p-0">
                      <a
                        className="relative inline-block h-full w-full"
                        href={certificateUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        <Image
                          className="object-cover"
                          src={imageUrl}
                          alt={name}
                          fill
                        />
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )),
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
