import { useState } from "react";
import Tree from "react-d3-tree";
import useCenteredTree from "./hooks/useCenteredTree";
import clone from "clone";
import { getRandomName } from "../../utils/utilFunctions";

function getInitialDummyData (account){
	
const initialData = {
  name: account.name,
  fraudProb: 80,
  moneyTransferred: 50000,
  children: [
    {
      name: getRandomName(),
      fraudProb: 70,
      moneyTransferred: 40000,
      children: [
        {
          name: getRandomName(),
          fraudProb: 30,
          moneyTransferred: 5000,
          children: [
            {
              name: getRandomName(),
              fraudProb: 20,
              moneyTransferred: 2000,
            },
          ],
        },
        {
          name: getRandomName(),
          fraudProb: 60,
          moneyTransferred:30000 ,
          children: [
            {
              name: getRandomName(),
              fraudProb: 80,
              moneyTransferred: 30000,
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
        fraudProb: 65,
        moneyTransferred: 10000
      },
    ],
  },
  {
    name: getRandomName(),
    children: [
      {
        name: getRandomName(),
        fraudProb: 70,
        moneyTransferred: 20000
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
		let nodeColor = 'green';
    if(nodeDatum.fraudProb>50)nodeColor = 'orange';
    if(nodeDatum.fraudProb>70)nodeColor = 'red';

    return (
      <g>
        <circle r="15" fill={nodeColor} onClick={toggleNode} />
        <text fill="black" strokeWidth="0.5" x="20" y="-5">
          <tspan x="20" dy="1.2em">name: {nodeDatum.name}</tspan>
          <tspan x="20" dy="1.2em">fraud probability: {nodeDatum.fraudProb}</tspan>
          <tspan x="20" dy="1.2em">money transferred: {nodeDatum.moneyTransferred}</tspan>
        </text>
      </g>
    );
  };

  return (
    <div className="w-full text-center h-[500px] bg-slate-200/50" ref={containerRef} >
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
