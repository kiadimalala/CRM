import { COLORS } from "@app/constants";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "@app/components";
import { useAppContext } from "@app/store";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

interface ItemProps {
  className?: string;
  user?: boolean;
  type?: string;
  content?: any;
  selectable?: boolean;
  header?: string[];
  handleDelete?: (e: any) => void;
  handleEdit?: (e: any) => void;
}

const Item: React.FC<ItemProps> = ({
  className,
  user,
  type,
  content,
  selectable,
  header,
  handleDelete,
  handleEdit,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const {
    editUser,
    setSelected,
    selected,
    ProductsHook: { editProduct },
  } = useAppContext();

  React.useEffect(() => {
    if (checked && content) {
      if (content._id) {
        setSelected(content._id);
      } else setSelected(content.id);
    } else {
      setSelected("");
    }
  }, [checked]);

  React.useEffect(() => {
    if (!selected) {
      setChecked(false);
    }
  }, [selected]);

  React.useEffect(() => {
    if ((!editUser || !editProduct) && !selected) {
      setChecked(false);
    }
  }, [editUser, editProduct, selected]);

  return (
    <ItemWrapper className={`item ${className ? className : ""}`}>
      {selectable && (
        <span className="selectable">
          <Checkbox
            checked={checked}
            onChange={(e: any) => setChecked(!checked)}
            disabled={selected && !checked ? true : false}
            className={`${header ? "hd_checkbox" : ""}`}
          />
        </span>
      )}
      {header && (
        <div className="selectable">
          <Checkbox
            disabled={header ? true : false}
            className={`${header ? "hd_checkbox" : ""}`}
          />
        </div>
      )}

      {user && (
        <div className="content_item">
          {content &&
            Object.keys(content).map((key) => {
              if (
                key !== "_id" &&
                key !== "id" &&
                key !== "__v" &&
                key !== "createdAt" &&
                key !== "password" &&
                key !== "slug" &&
                key !== "stat" &&
                key !== "nif" &&
                key !== "rcs"
              ) {
                return <div key={key}>{content[key]}</div>;
              }
            })}
        </div>
      )}
      {!content && header && type === "user" && (
        <div className="content_item">
          {header.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
      {user && (
        <span className={`action_container ${checked ? "checked" : ""}`}>
          <Button
            className={`btn_round btn_edit ${checked ? "opened" : ""}`}
            onClick={handleEdit}
          >
            <Edit />
          </Button>
          <Button
            className={`btn_round btn_delete ${checked ? "opened" : ""}`}
            onClick={handleDelete}
          >
            <DeleteOutlined />
          </Button>
        </span>
      )}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  &.item {
    position: relative;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-bottom: 0.5rem;
    .content_item {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
      .selectable {
        width: 10rem;
        height: 100%;
      }
      .name {
      }
    }
    .action_container {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: all 2s ease-out;
    }
    .checked {
      width: 10rem;
      opacity: 1;
      transition: all 0.05s ease-in;
    }
  }
  &.item_header {
    font-weight: 700;
    border-bottom: 2px solid ${COLORS.cyan};
    div {
      text-transform: capitalize;
    }
    .hd_checkbox {
      opacity: 0;
    }
  }
`;

export default Item;
