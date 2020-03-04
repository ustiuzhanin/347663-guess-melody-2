import React from "react";
import renderer from "react-test-renderer";
import ModalError from "./modal-error.jsx";

test(`ModalError's Snapshot`, () => {
  const tree = renderer
    .create(
        <ModalError
          errorMessage={{
            status: 404,
            data: {
              error: `Not Found`
            }
          }}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
