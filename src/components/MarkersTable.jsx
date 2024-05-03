import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useMap } from "react-leaflet/hooks";
import markerService from "../service/marker.service";
import "./MarkersTable.css";

const MarkersTable = ({ onMarkerAdd, onMarkerRemove }) => {
  const map = useMap();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
        <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Button
            key="savebutton"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => addMarker()}
          >
            Save Point
          </Button>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => markerService.downloadMarkerList()}
            disabled={tableData.length > 0 ? false : true}
          >
            Download
          </Button>
        </div>
      ),
      key: "action",
      render: (_, record) => {
        return (
          <Button
            key={"deletebutton" + record.id}
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => deleteMarker(record.id)}
          />
        );
      },
      align: "center",
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

  const handleRowClick = (record) => {
    if (record.id === selectedRowKeys) {
      setSelectedRowKeys(null);
      onMarkerRemove();
    } else {
      setSelectedRowKeys(record.id);
      map.flyTo({ lat: record.lat, lng: record.lng });
      onMarkerAdd({ lat: record.lat, lng: record.lng });
    }
  };

  const rowClassName = (record, index) => {
    return record.id === selectedRowKeys ? "selected-row" : "";
  };

  useEffect(() => {
    getMarker();
  }, []);

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName={rowClassName}
        size="small"
        style={{ height: "450px", width: "600px" }}
        pagination={false}
      />
    </>
  );
};

export default MarkersTable;
