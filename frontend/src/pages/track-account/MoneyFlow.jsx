import { useState } from "react";
import Tree from "react-d3-tree";
import useCenteredTree from "./hooks/useCenteredTree";
import clone from "clone";
import { getRandomName } from "../../utils/utilFunctions";

function getInitialDummyData (account){
	
const initialData = {
  name: account.name,
  children: [
    {
      name: getRandomName(),

      children: [
        {
          name: getRandomName(),
          children: [
            {
              name: getRandomName(),
            },
          ],
        },
        {
          name: getRandomName(),
    
          children: [
            {
              name: getRandomName(),
            },
          ],
        },
      ],
    },
  ],
};
return initialData;
}

const apiChildrenPayload = [
  {
    name: getRandomName(),
    children: [
      {
        name: getRandomName(),
      },
    ],
  },
  {
    name: getRandomName(),
    children: [
      {
        name: getRandomName(),
      },
    ],
  },
];

const fetchChildDataFromApi = () => Promise.resolve(apiChildrenPayload);

// Get the first leaf node we find in the data set.
const findLeafNode = (node) => {
  console.log(node.name, node.children?.length ?? 0);
  if (!node.children) {
    return node;
  }
  const nextNode = node.children[0];
  return findLeafNode(nextNode);
};

const isLeafNode = (node) => Boolean(node.children) === false;

// eslint-disable-next-line react/prop-types
export default function MoneyFlow({account}) {
  const [translate, containerRef] = useCenteredTree();
  const [data, setData] = useState(getInitialDummyData(account));
	const [depth, setDepth] = useState(1);

  const updateDataFromApi = async () => {
    const nextData = clone(data);
    const insertionNode = findLeafNode(nextData);
    const childrenFromApi = await fetchChildDataFromApi();
    insertionNode.children = childrenFromApi;
    setData(nextData);
		setDepth(depth+1);
  };

	const renderRectSvgNode = (customProps) => {
    const { nodeDatum, toggleNode } = customProps;
		const nodeColor = (nodeDatum.children?.length)? "#006d77": "#777";
    return (
      <g>
        <circle r="15" fill={nodeColor} onClick={toggleNode} />
        <text fill="black" strokeWidth="0.5" x="20" y="-5">
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-full text-center bg-secondary" ref={containerRef} >
      <Tree
        data={data}
        translate={translate}
        orientation="vertical"
				renderCustomNodeElement={(nodeInfo) => renderRectSvgNode(nodeInfo)}
        onNodeClick={(node) => isLeafNode(node) && updateDataFromApi()}
				initialDepth={depth}
      />
    </div>
  );
}
