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
            <a
              onClick={() => {
                showModal("edit");
                setPostForm({ user_id, title, body });
                setSelectedRecord(record.id);
              }}
            >
              Edit
            </a>{" "}
            |{" "}
            <a
              onClick={() => {
                showModal("delete");
                setSelectedRecord(record.id);
              }}
            >
              Delete
            </a>
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
  };

  const handleCancel = () => {
    setDialogMode(null);
    setPostForm(emptyPost);
    setSelectedRecord(0);
  };

  const emptyPost = { title: "", body: "", user_id: 1871 };
  const [postForm, setPostForm] = useState<PostForm>(emptyPost);

  console.log({ postForm });

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
        title="Basic Modal"
        visible={Boolean(dialogMode)}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {dialogMode === "add" || dialogMode === "edit" ? (
          <>
            <div>
              <Input
                placeholder="Title"
                value={postForm?.title}
                onChange={(e) =>
                  setPostForm({ ...postForm, title: e.target.value })
                }
              />
            </div>
            <div>
              <TextArea
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
