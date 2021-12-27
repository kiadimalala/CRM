import { SearchOutlined } from "@mui/icons-material";
import { Paper } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Input, Item } from "@app/components";
import { useAppContext } from "@app/store";
import { AuthModels, BasicModels } from "@app/models";

interface ListsProps {
  className?: string;
  content?:
    | AuthModels.IUser[]
    | BasicModels.IClient[]
    | BasicModels.IProduct[]
    | BasicModels.IQuotation[];
  type: string;
  header: string[];
  handleDelete?: (e: any) => void;
  handleEdit?: (e: any) => void;
  queryPath: string;
  selected?: string;
  setSelectedUser?: React.Dispatch<React.SetStateAction<string>>;
}
const Lists: React.FC<ListsProps> = ({
  content,
  type,
  header,
  handleDelete,
  handleEdit,
  queryPath,
}) => {
  const { query, setQuery } = useAppContext();
  const onQueryChange = (e: any) => {
    e.preventDefault();
    const val = e.target.value;
    setQuery(val);
  };
  return (
    <ListsWrapper className="users_container">
      <Paper className="content">
        <div className="header">
          <Input
            type="text"
            value={query}
            placeholder="Recherche"
            onChange={onQueryChange}
            className="search_input"
          >
            <span>
              <SearchOutlined />
            </span>
          </Input>
        </div>
        <div className="lists">
          <div className="list_header">
            <Item type={type} className="item_header" header={header} />
          </div>
          <div className="list_content">
            {content?.map((item, index) => (
              <Item
                key={index}
                selectable
                user
                content={item}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </Paper>
    </ListsWrapper>
  );
};

const ListsWrapper = styled.div`
  &.users_container {
    height: 90%;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      .header {
        height: 10%;
        display: flex;
        align-items: center;
        padding: 1rem;
      }
      .lists {
        display: flex;
        flex-direction: column;
        height: 90%;
        padding: 0.5rem;
        overflow: hidden;
        padding-top: 3rem;
        .list_header {
          height: 12.5%;
        }
        .list_content {
          width: 100%;
          height: 87.5%;
          overflow-y: auto;
          overflow-x: hidden;
        }
      }
    }
  }
`;

export default Lists;
