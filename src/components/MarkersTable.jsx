import React from "react";
import { Button, Table } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMap } from 'react-leaflet/hooks'

const data = [
  {
    key: "1",
    lat: 1,
    lng: 1,
    date: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    lat: 2,
    lng: 2,
    date: "New York No. 1 Lake Park",
  },
];

const MarkersTable = (props) => {
  const { addMarker } = props;
  const map = useMap();

  const columns = [
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "lat",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Longitude",
      dataIndex: "lng",
      key: "lng",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            addMarker({
              lat: map.getCenter().lat,
              lng: map.getCenter().lng,
              date: new Date(),
            });
          }}
        >
          Save Point
        </Button>
      ),
      key: "action",
      render: (_, record) => (
        <Button danger type="primary" icon={<DeleteOutlined />} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default MarkersTable;
