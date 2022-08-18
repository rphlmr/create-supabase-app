/**
 * Credit to https://github.com/kevva/ink-confirm-input
 * This is a fork of the original component that is not maintained anymore
 */
import React, { useCallback } from "react";

import { UncontrolledTextInput } from "ink-text-input";
import yn from "yn";

type ConfirmInputProps = React.ComponentProps<typeof UncontrolledTextInput> & {
  isChecked?: boolean;
  onSubmit: (checked: boolean) => void;
};
export const ConfirmInput = ({
  isChecked,
  onSubmit,
  ...props
}: ConfirmInputProps) => {
  const handleSubmit = useCallback(
    (newValue: string) => {
      onSubmit(yn(newValue, { default: Boolean(isChecked), lenient: true }));
    },
    [isChecked, onSubmit]
  );

  return (
    <UncontrolledTextInput
      {...props}
      onSubmit={handleSubmit}
      placeholder={isChecked ? "Y" : "N"}
    />
  );
};
