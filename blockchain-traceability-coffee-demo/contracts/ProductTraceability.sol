// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ProductTraceability {
    address public owner;
    mapping(address => bool) public writers;

    struct Product {
        string id;
        string name;
        string origin;
        string manufacturer;
        uint256 createdAt;
        bool exists;
    }

    struct TraceEvent {
        string status;
        string location;
        string note;
        uint256 timestamp;
        address actor;
    }

    mapping(string => Product) private products;
    mapping(string => TraceEvent[]) private histories;

    event ProductCreated(string indexed id, string name, address indexed actor);
    event TraceAdded(string indexed id, string status, address indexed actor);
    event WriterUpdated(address indexed account, bool allowed);

    modifier onlyOwner() { require(msg.sender == owner, "Only owner"); _; }
    modifier onlyWriter() { require(msg.sender == owner || writers[msg.sender], "Not authorized"); _; }

    constructor() { owner = msg.sender; }

    function setWriter(address account, bool allowed) external onlyOwner {
        writers[account] = allowed;
        emit WriterUpdated(account, allowed);
    }

    function createProduct(string calldata id, string calldata name, string calldata origin, string calldata manufacturer) external onlyWriter {
        require(bytes(id).length > 0, "Empty id");
        require(!products[id].exists, "Product exists");
        products[id] = Product(id, name, origin, manufacturer, block.timestamp, true);
        emit ProductCreated(id, name, msg.sender);
    }

    function addTrace(string calldata id, string calldata status, string calldata location, string calldata note) external onlyWriter {
        require(products[id].exists, "Unknown product");
        histories[id].push(TraceEvent(status, location, note, block.timestamp, msg.sender));
        emit TraceAdded(id, status, msg.sender);
    }

    function getProduct(string calldata id) external view returns (Product memory) {
        require(products[id].exists, "Unknown product");
        return products[id];
    }

    function getHistory(string calldata id) external view returns (TraceEvent[] memory) {
        require(products[id].exists, "Unknown product");
        return histories[id];
    }
}
