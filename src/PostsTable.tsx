import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./store";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "./store/actions/postActions";
import { Datum, PostResponse } from "./types/post";
import { Button, Input, Modal, Table } from "antd";
import TextArea from "rc-textarea";
import { Select } from "antd";
import { userData } from "./data";

const { Option } = Select;

export interface PostForm {
  title: string;
  body: string;
  user_id: number;
}

function PostsTable() {
  const {
    data: posts,
    loading,
    error,
  } = useSelector((state: AppState) => state.posts);
  const [dialogMode, setDialogMode] = useState<
    "add" | "edit" | "delete" | null
  >(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const [selectedRecord, setSelectedRecord] = useState<number>(0);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record: Datum) => {
        const { user_id, title, body } = record;
        return (
          <>
            <Button
              size="small"
              type="primary"
              ghost
              style={{ marginRight: 5 }}
              onClick={() => {
                showModal("edit");
                setPostForm({ user_id, title, body });
                setSelectedRecord(record.id);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              danger
              ghost
              onClick={() => {
                showModal("delete");
                setSelectedRecord(record.id);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const showModal = (mode: typeof dialogMode) => {
    setDialogMode(mode);
  };

  const handleOk = () => {
    if (dialogMode === "add") {
      dispatch(addPost(postForm));
    }
    if (dialogMode === "edit") {
      dispatch(updatePost(selectedRecord, postForm));
    }
    if (dialogMode === "delete") {
      dispatch(deletePost(selectedRecord));
    }
    setDialogMode(null);
    setPostForm(emptyPost);
  };

  const handleCancel = () => {
    setDialogMode(null);
    setPostForm(emptyPost);
    setSelectedRecord(0);
  };

  const emptyPost = { title: "", body: "", user_id: 771 };
  const [postForm, setPostForm] = useState<PostForm>(emptyPost);

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => showModal("add")}>Add New</Button>
      </div>
      <Table
        dataSource={posts}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title={
          dialogMode === "add"
            ? "Add"
            : dialogMode === "edit"
            ? "Edit"
            : dialogMode === "delete"
            ? "Delete"
            : ""
        }
        visible={Boolean(dialogMode)}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {dialogMode === "add" || dialogMode === "edit" ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <Input
                style={{ borderColor: "#ccc" }}
                placeholder="Title"
                value={postForm?.title}
                onChange={(e) =>
                  setPostForm({ ...postForm, title: e.target.value })
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <TextArea
                style={{ borderColor: "#ccc" }}
                rows={4}
                placeholder="Post Body"
                value={postForm?.body}
                onChange={(e) =>
                  setPostForm({ ...postForm, body: e.target.value })
                }
              />
            </div>
          </>
        ) : (
          <p>Are you sure?</p>
        )}
      </Modal>
    </React.Fragment>
  );
}

export default PostsTable;
