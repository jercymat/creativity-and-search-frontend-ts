import React, { useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import styles from "./ThemeToggleModal.module.scss";
import { IMButtonIcon, IMButtonNormal } from "../../common/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { IMThemeDialogColorPicker } from "./IMThemeDialogColorPicker";
import { ideaMapperActions } from "../../../store/reducers/idea-mapper";
import { ThemeToggle } from "../../../model/idea-mapper";
import { SearchMapperTheme } from "../../../model/search-mapper";

interface ThemeToggleDialogProps {
  show: boolean;
  currentFocusTheme: number;
  onCloseDialog: () => void;
}

export const IMThemeToggleDialog = (props: ThemeToggleDialogProps) => {
  const { show, currentFocusTheme, onCloseDialog } = props;
  const { smThemes } = useSelector((state: RootState) => state.searchMapper);
  const { themeToggles } = useSelector((state: RootState) => state.ideaMapper);
  const [colorScheme, setColorScheme] = useState("#F0F0F0");

  const dispatch = useDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newToggle: ThemeToggle = {
      ...themeToggle,
      savedResults: themeToggle.savedResults.map((result) => ({
        ...result,
        shown: event.currentTarget[`theme-sr-${result.id}`].checked,
      })),
      noteShown:
        theme.note !== "" ? event.currentTarget["theme-note"].checked : false,
      colorScheme,
    };

    dispatch(
      ideaMapperActions.updateToggle({ themeID: newToggle.id, newToggle })
    );
    onCloseDialog();
  };

  const handleRemoveTheme = () => {
    const newToggle: ThemeToggle = {
      ...themeToggle,
      shown: false,
      noteShown: false,
      savedResults: themeToggle.savedResults.map((result) => ({
        ...result,
        shown: false,
      })),
    };

    dispatch(
      ideaMapperActions.updateToggle({ themeID: newToggle.id, newToggle })
    );
    onCloseDialog();
  };

  const themeToggle: ThemeToggle = useMemo(
    () =>
      themeToggles.find((theme) => theme.id == currentFocusTheme)
        ? (themeToggles.find(
            (theme) => theme.id == currentFocusTheme
          ) as ThemeToggle)
        : {
            id: -1,
            name: "",
            note: "",
            shown: false,
            noteShown: false,
            colorScheme: "#F0F0F0",
            savedResults: [{ id: -1, shown: false }],
          },
    [currentFocusTheme, themeToggles]
  );

  const theme: SearchMapperTheme = useMemo(
    () =>
      smThemes.find((theme) => theme.id == currentFocusTheme)
        ? (smThemes.find(
            (theme) => theme.id == currentFocusTheme
          ) as SearchMapperTheme)
        : {
            id: -1,
            name: "",
            note: "",
            noteID: -1,
            searchResultList: [
              { id: "-1", title: "", url: "", description: "" },
            ],
          },
    [currentFocusTheme, smThemes]
  );

  return (
    <Modal show={show} centered>
      <Modal.Header style={{ borderBottom: "none" }}>
        <Modal.Title>{theme.name}</Modal.Title>
        <IMThemeDialogColorPicker
          defaultColor={
            themeToggle.colorScheme !== undefined
              ? themeToggle.colorScheme
              : "#F0F0F0"
          }
          onPickedColor={(hex) => setColorScheme(hex)}
        />
      </Modal.Header>
      <Modal.Body>
        <Form id="theme-toggle" noValidate onSubmit={handleSubmit}>
          {theme.searchResultList.map((result, idx) => (
            <Form.Group
              key={result.id}
              className={`mb-3 ${styles.form_check}`}
              controlId={`theme-sr-${result.id}`}
            >
              <Form.Switch
                name={`theme-sr-${result.id}`}
                defaultChecked={themeToggle.savedResults[idx].shown}
                label={result.title}
              />
            </Form.Group>
          ))}
          {theme.note !== "" && (
            <>
              <hr />
              <Form.Group
                className={styles.form_multiline_check}
                controlId="theme-note"
              >
                <Form.Switch>
                  <Form.Switch.Input
                    name="theme-note"
                    defaultChecked={themeToggle.noteShown}
                  />
                  <Form.Switch.Label>
                    <div className={styles.label_title}>IdeaNote</div>
                    <div className={styles.label_subtitle}>{theme.note}</div>
                  </Form.Switch.Label>
                </Form.Switch>
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        <IMButtonIcon
          bsVariant="danger"
          bsIcon="trash3"
          className="me-auto"
          onClick={handleRemoveTheme}
        />
        <IMButtonNormal bsVariant="secondary" onClick={onCloseDialog}>
          Cancel
        </IMButtonNormal>
        <IMButtonNormal bsVariant="primary" type="submit" form="theme-toggle">
          Save
        </IMButtonNormal>
      </Modal.Footer>
    </Modal>
  );
};
