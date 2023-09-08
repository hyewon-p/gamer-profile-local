import type { Meta, StoryObj } from "@storybook/react";
import { RecoilRoot, useRecoilState } from "recoil";
import Library from "@components/Library/Library";
import { isOwnerValue } from "store/user.store";
import React from "react";
import { gameInfo } from "interfaces/game";
import Favorite from "@components/Favorite/Favorite";

const TestFavorite: React.FC<{ library: gameInfo[] }> = ({ library }) => {
  const [isOwner, setIsOwner] = useRecoilState(isOwnerValue);
  setIsOwner(true);

  return <Favorite library={library} />;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Favorite",
  component: TestFavorite,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj;

export const User: Story = {
  args: { library: [] },
};
