import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent, { specialChars } from "@testing-library/user-event";
import React from "react";
import { Autocomplete, AutocompleteProps } from "./Autocomplete";

const data = [
  "Açaí",
  "Apple",
  "Akee",
  "Apricot",
  "Avocado",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Black sapote",
  "Blueberry",
  "Boysenberry",
  "Buddha's hand",
  "Crab",
  "Currant",
  "Cherry",
  "Cherimoya",
  "Chico fruit",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Pineapple",
  "Star apple",
];

const setup = (props: Partial<AutocompleteProps> = {}) => {
  const defaultProps = {
    id: "autocomplete",
    label: "autocomplete",
    options: data,
    onOptionSelect: jest.fn(),
    name: "autocomplete",
  };
  render(<Autocomplete {...defaultProps} {...props}></Autocomplete>);
};

describe("Autocomplete", () => {
  test("input shows default value", () => {
    setup({ value: "Apple" });
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("Apple");
  });

  test("lists all data when nothing is put in input", () => {
    setup();
    const input = screen.getByRole("combobox");
    userEvent.click(input);
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(data.length);
    options.forEach((option, i) => {
      expect(option).toHaveTextContent(new RegExp(data[i]));
    });
  });

  test("lists no data when there are no match", async () => {
    setup();
    const input = screen.getByRole("combobox");
    userEvent.click(input);
    userEvent.type(input, "asdkjfhasgdf6768767878");
    const options = screen.queryAllByRole("option");
    expect(options.length).toBe(0);
  });

  test("finds appropriate list with fuzzy search", () => {
    setup();
    const input = screen.getByRole("combobox");
    userEvent.click(input);
    userEvent.type(input, "apple");
    const options = screen.queryAllByRole("option");
    const firstOption = options[0].querySelector("div:not([aria-hidden])");
    const secondOption = options[1].querySelector("div:not([aria-hidden])");

    expect(firstOption).toHaveTextContent("Apple");
    expect(secondOption).toHaveTextContent("Pineapple");
  });

  test("highlights text match", () => {
    setup();
    const input = screen.getByRole("combobox");
    userEvent.click(input);
    userEvent.type(input, "pple");
    const options = screen.queryAllByRole("option");
    const firstOption = options[0];
    expect(firstOption).toHaveTextContent("Apple");
    const highlightedText = firstOption.querySelector("strong");
    expect(highlightedText).toHaveTextContent("pple");
  });

  test("Clicking an autocomplete suggestion calls value setter", () => {
    const onOptionSelect = jest.fn();
    setup({ onOptionSelect });
    const input = screen.getByRole("combobox");
    userEvent.click(input);
    userEvent.type(input, "Apple");
    const options = screen.queryAllByRole("option");
    userEvent.click(options[0]);
    expect(onOptionSelect).toHaveBeenCalledWith("Apple");
  });

  // could not figure out a way to test this
  test.todo("Can navigate with up and down arrow");
});
