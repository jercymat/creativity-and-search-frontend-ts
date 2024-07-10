import React, { useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { titleCase } from "../../../utils";
import { IMButtonIcon, IMButtonNormal } from "../../common/button";
import { IMIdeaDialogColorPicker } from "./IMIdeaDialogColorPicker";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Node } from "reactflow";

type IdeaDialogProps = {
  show: boolean;
  mode: "add" | "edit";
  type: "text" | "link" | "image";
  ideaID: string | null;
  onClose: () => void;
  onAddIdea: (type: "text" | "link" | "image", data: object) => void;
  onUpdateIdea: (data: object) => void;
  onDeleteIdea: () => void;
};

type IdeaSubDialogProps = {
  data: {
    label?: string;
    link?: string;
    img_url?: string;
  };
};

export const IMIdeaDialog = (props: IdeaDialogProps) => {
  const {
    show,
    mode,
    type,
    ideaID,
    onClose,
    onAddIdea,
    onUpdateIdea,
    onDeleteIdea,
  } = props;
  const [validated, setValidated] = useState(false);
  const [colorHex, setColorHex] = useState("#FFFFFF");
  const { graph } = useSelector((state: RootState) => state.ideaMapper);

  const node = useMemo(
    () =>
      graph.nodes.find((node) => node.id == ideaID) ??
      ({
        data: {
          colorHex: "#FFFFFF",
        },
      } as Node),
    [graph, ideaID]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() == false) return;

    const fd = new FormData(form);

    if (mode === "add") {
      if (type === "text") {
        onAddIdea(type, {
          label: fd.get("text")?.toString() ?? "",
          color: "w",
          colorHex,
        });
      } else if (type === "link") {
        onAddIdea(type, {
          title: "",
          link: fd.get("link_url")?.toString() ?? "",
          color: "w",
          colorHex,
        });
      } else if (type === "image") {
        onAddIdea(type, {
          img_url: fd.get("image_url")?.toString() ?? "",
          color: "w",
          colorHex,
        });
      }
    } else if (mode === "edit") {
      if (type === "text") {
        onUpdateIdea({
          label: fd.get("text")?.toString() ?? "",
          color: "w",
          colorHex,
        });
      } else if (type === "link") {
        onUpdateIdea({
          title: "",
          link: fd.get("link_url")?.toString() ?? "",
          color: "w",
          colorHex,
        });
      } else if (type === "image") {
        onUpdateIdea({
          img_url: fd.get("image_url")?.toString() ?? "",
          color: "w",
          colorHex,
        });
      }
    }
    setValidated(false);
  };

  return (
    <Modal show={show} centered>
      <Modal.Header style={{ borderBottom: "none" }}>
        <Modal.Title>
          {titleCase(mode)} {titleCase(type)} Idea
        </Modal.Title>
        <IMIdeaDialogColorPicker
          defaultColor={mode == "edit" ? node.data.colorHex : "#FFFFFF"}
          onPickedColor={(hex) => setColorHex(hex)}
        />
      </Modal.Header>
      <Modal.Body>
        <Form
          id="add-idea"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          {
            {
              text: <TextIdeaDialog data={mode == "edit" ? node.data : null} />,
              link: <LinkIdeaDialog data={mode == "edit" ? node.data : null} />,
              image: (
                <ImageIdeaDialog data={mode == "edit" ? node.data : null} />
              ),
            }[type]
          }
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        {mode === "edit" ? (
          <IMButtonIcon
            bsVariant="danger"
            bsIcon="trash3"
            className="me-auto"
            onClick={onDeleteIdea}
          />
        ) : null}
        <IMButtonNormal bsVariant="secondary" onClick={onClose}>
          Cancel
        </IMButtonNormal>
        <IMButtonNormal bsVariant="primary" type="submit" form="add-idea">
          Save
        </IMButtonNormal>
      </Modal.Footer>
    </Modal>
  );
};

function TextIdeaDialog(props: IdeaSubDialogProps) {
  const { data } = props;

  return (
    <Form.Group controlId="text-idea-text">
      <Form.Control
        as="textarea"
        name="text"
        rows={3}
        placeholder="Enter some text..."
        defaultValue={data !== null ? data.label : ""}
        required
      ></Form.Control>
    </Form.Group>
  );
}

function LinkIdeaDialog(props: IdeaSubDialogProps) {
  const { data } = props;

  return (
    <Form.Group controlId="link-idea-link">
      <Form.Control
        type="url"
        name="link_url"
        placeholder="https://"
        defaultValue={data !== null ? data.link : ""}
        required
      ></Form.Control>
    </Form.Group>
  );
}

function ImageIdeaDialog(props: IdeaSubDialogProps) {
  const { data } = props;

  return (
    <Form.Group controlId="iomage-idea-url">
      <Form.Control
        type="url"
        name="image_url"
        placeholder="Paste URL of the image"
        defaultValue={data !== null ? data.img_url : ""}
        required
      ></Form.Control>
    </Form.Group>
  );
}
