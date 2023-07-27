import React, { useCallback, useEffect, useState } from "react";
import { SearchMapperTheme } from "../../../model/search-mapper";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import styles from "./SMThemeButton.module.scss";
import { IMButtonNormal } from "../../common/button";

type SMThemeDialogProps = {
  show: boolean;
  mode: "add" | "move";
  submitting: boolean;
  themes: SearchMapperTheme[];
  currentFocusTheme: number;
  currentFocusResult: number;
  onSubmission: (
    fromThemeID: number,
    toThemeID: number,
    resultID: number,
    themeName: string
  ) => void;
  onClose: () => void;
};

const TITLES = {
  add: "Add to IdeaTag",
  move: "Move to IdeaTag",
};

export const IMSMThemeDialog = (props: SMThemeDialogProps) => {
  const {
    show,
    mode,
    submitting,
    themes,
    currentFocusTheme,
    currentFocusResult,
    onSubmission,
    onClose,
  } = props;
  const [chosenGroupID, setChosenGroupID] = useState<number | null>(null);
  const [themeName, setThemeName] = useState("");

  const handleSubmit = useCallback(() => {
    if (chosenGroupID != null) {
      onSubmission(
        currentFocusTheme,
        chosenGroupID,
        currentFocusResult,
        chosenGroupID != -1 ? "" : themeName
      );
      clearForm();
    }
  }, [chosenGroupID, themeName]);

  const handleCancel = useCallback(() => {
    onClose();
    clearForm();
  }, []);

  const clearForm = useCallback(() => {
    setChosenGroupID(null);
    setThemeName("");
  }, []);

  useEffect(() => {
    if (show == false || mode != "move") return;
    setChosenGroupID(currentFocusTheme);
  }, [show]);

  return (
    <Modal show={show} centered>
      <Modal.Header style={{ borderBottom: "none" }}>
        <Modal.Title>{TITLES[mode]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.controls}>
          <Button
            variant="outline-primary"
            className={chosenGroupID == -1 ? styles.active : undefined}
            onClick={() => setChosenGroupID(-1)}
          >
            <h2 className={styles.title}>New IdeaTag</h2>
            <h4 className={styles.sr_count}>
              Create a new IdeaTag for this result
            </h4>
          </Button>
          <Form.Control
            name="new-theme-name"
            defaultValue={themeName}
            onChange={(e) => setThemeName(e.currentTarget.value)}
            placeholder="Enter the IdeaTag name..."
            hidden={chosenGroupID != -1}
            required={chosenGroupID == -1}
          />
          {themes.slice(1).length != 0 && <hr />}
          {themes.slice(1).map((theme) => (
            <Button
              key={theme.id}
              variant="outline-primary"
              className={theme.id == chosenGroupID ? styles.active : undefined}
              onClick={() => setChosenGroupID(theme.id)}
            >
              <h2 className={styles.title}>{theme.name}</h2>
              <h4 className={styles.sr_count}>
                {theme.searchResultList.length} Saved Result
                {theme.searchResultList.length > 1 && "s"}
              </h4>
            </Button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        <IMButtonNormal bsVariant="secondary" onClick={handleCancel}>
          Cancel
        </IMButtonNormal>
        <IMButtonNormal
          bsVariant="primary"
          loading={submitting}
          disabled={chosenGroupID == null}
          onClick={handleSubmit}
        >
          Save
        </IMButtonNormal>
      </Modal.Footer>
    </Modal>
  );
};
