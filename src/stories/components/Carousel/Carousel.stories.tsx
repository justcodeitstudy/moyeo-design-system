import { Meta, Story } from "@storybook/react";
import React from "react";
import { Carousel, CarouselProps } from "../../../components/Carousel";
import styled from "styled-components";

// 테스트용 이미지입니다
import carousel1 from "../../../components/Carousel/assets/carousel-1.webp";
import carousel2 from "../../../components/Carousel/assets/carousel-2.webp";
import carousel3 from "../../../components/Carousel/assets/carousel-3.webp";
import carousel4 from "../../../components/Carousel/assets/carousel-4.webp";
import carousel5 from "../../../components/Carousel/assets/carousel-5.webp";

export default {
  title: "Components/Carousel",
  component: Carousel,
} as Meta;

export const Default: Story<CarouselProps> = (args) => {
  return (
    <Carousel {...args}>
      <Image src={carousel1} alt="테스트" />
      <Image src={carousel2} alt="테스트" />
      <Image src={carousel3} alt="테스트" />
      <Image src={carousel4} alt="테스트" />
      <Image src={carousel5} alt="테스트" />
    </Carousel>
  );
};

Default.args = {
  autoPlay: true,
};

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
