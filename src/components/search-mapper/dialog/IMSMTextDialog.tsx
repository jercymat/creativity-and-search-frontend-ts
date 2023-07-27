import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { SearchMapperTheme } from "../../../model/search-mapper";
import { IMButtonNormal } from "../../common/button";

type SMTextDialogProps = {
  show: boolean;
  mode: "edit-idea" | "rename-theme";
  submitting: boolean;
  themes: SearchMapperTheme[];
  currentFocusTheme: number;
  onRenameTheme: (themeID: number, name: string) => void;
  onEditIdea: (themeID: number, noteID: number, content: string) => void;
  onClose: () => void;
};

const TITLES = {
  "add-idea": "Add IdeaNote",
  "edit-idea": "Edit IdeaNote",
  "rename-theme": "Rename IdeaTag",
};

const PLACEHOLDERS = {
  "add-idea": "Enter your IdeaNote...",
  "edit-idea": "Enter your IdeaNote...",
  "rename-theme": "Enter the IdeaTag name...",
};

export const IMSMTextDialog = (props: SMTextDialogProps) => {
  const {
    show,
    mode,
    submitting,
    themes,
    currentFocusTheme,
    onRenameTheme,
    onEditIdea,
    onClose,
  } = props;
  const [validated, setValidated] = useState(false);
  const [text, setText] = useState("");
  const [noteID, setNoteID] = useState(-1);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() == false) return;

    const fd = new FormData(form);

    if (mode == "rename-theme") {
      onRenameTheme(currentFocusTheme, fd.get("theme-idea")?.toString() ?? "");
    } else if (mode == "edit-idea") {
      onEditIdea(
        currentFocusTheme,
        noteID,
        fd.get("theme-idea")?.toString() ?? ""
      );
    }
    clearForm();
  };

  const clearForm = () => {
    setValidated(false);
  };

  useEffect(() => {
    const currentTheme = themes.find((theme) => theme.id == currentFocusTheme);
    if (currentTheme == undefined) return;

    if (mode == "rename-theme") {
      setText(currentTheme.name);
    } else if (mode == "edit-idea") {
      setText(currentTheme.note);
      setNoteID(currentTheme.noteID);
    }
  }, [currentFocusTheme, themes, mode]);

  return (
    <Modal show={show} centered>
      <Modal.Header style={{ borderBottom: "none" }}>
        <Modal.Title>{TITLES[mode]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="add-theme-idea"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="text-idea-text">
            {mode == "rename-theme" ? (
              <Form.Control
                key={text}
                as="input"
                name="theme-idea"
                defaultValue={text}
                placeholder={PLACEHOLDERS[mode]}
                required
              />
            ) : (
              <Form.Control
                key={text}
                as="textarea"
                name="theme-idea"
                defaultValue={text}
                rows={3}
                placeholder={PLACEHOLDERS[mode]}
                required
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        <IMButtonNormal bsVariant="secondary" onClick={onClose}>
          Cancel
        </IMButtonNormal>
        <IMButtonNormal
          bsVariant="primary"
          type="submit"
          form="add-theme-idea"
          loading={submitting}
        >
          Save
        </IMButtonNormal>
      </Modal.Footer>
    </Modal>
  );
};
