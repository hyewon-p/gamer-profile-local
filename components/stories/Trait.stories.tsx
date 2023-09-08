import Trait from "@components/Trait";
import { Meta, StoryObj } from "@storybook/react";
import { RecoilRoot, useRecoilState } from "recoil";
import { isOwnerValue } from "store/user.store";

const TestTrait: React.FC = () => {
  const [isOwner, setIsOwner] = useRecoilState(isOwnerValue);
  setIsOwner(true);

  return <Trait />;
};

const meta: Meta = {
  title: "Trait",
  component: TestTrait,
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
  args: {},
};
