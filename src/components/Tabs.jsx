import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchContent = async () => {
  const response = await axios.get(
    `http://localhost:8080/https://loripsum.net/api/1/medium/plaintext`
  );
  let content = response.data;
  return content;
};

const Tabs = () => {
  const tabs = [
    { id: 1, tabTitle: "Tab 1", title: "Title 1" },
    { id: 2, tabTitle: "Tab 2", title: "Title 2" },
    { id: 3, tabTitle: "Tab 3", title: "Title 3" },
    { id: 4, tabTitle: "Tab 4", title: "Title 4" },
  ];

  const [activeTab, setActiveTab] = useState(1);

  const {
    data: content,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["content", activeTab],
    queryFn: fetchContent,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <h2>{tabs.find((tab) => tab.id === activeTab)?.title}</h2>
        {isLoading ? (
          <p>Loading ...</p>
        ) : isError ? (
          <p>{error.message || "Content fetching failed."}</p>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
