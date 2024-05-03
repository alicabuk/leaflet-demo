import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMap } from "react-leaflet/hooks";
import markerService from "../service/marker.service";

const MarkersTable = () => {
  const map = useMap();
  const [tableData, setTableData] = useState([]);
  const [marker, setMarker] = useState();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "lat",
      render: (text) => <p>{text.toFixed(4)}</p>,
    },
    {
      title: "Longitude",
      dataIndex: "lng",
      key: "lng",
      render: (text) => <p>{text.toFixed(4)}</p>,
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
          onClick={() => addMarker()}
        >
          Save Point
        </Button>
      ),
      key: "action",
      render: (_, record) => {
        return (
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => deleteMarker(record.id)}
          />
        );
      },
    },
  ];

  const getMarker = () => {
    markerService.getAllMarker().then((res) => {
      if (res.success) {
        setTableData(res.data);
      }
    });
  };

  const addMarker = async () => {
    let data = {
      lat: map.getCenter().lat,
      lng: map.getCenter().lng,
      date: new Date(),
    };

    await markerService.addMarker(data).then((res) => {
      if (res.success) {
        getMarker();
      }
    });
  };

  const deleteMarker = async (id) => {
    await markerService.deleteMarker(id).then((res) => {
      if (res.success) {
        getMarker();
      }
    });
  };

  useEffect(() => {
    getMarker();
  }, []);

  return (
    <>
      <Table rowKey="id" columns={columns} dataSource={tableData} />
    </>
  );
};

export default MarkersTable;
