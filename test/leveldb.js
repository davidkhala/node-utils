const LevelDB = require('../leveldb');


const transientStore = '/home/mediconcen/Documents/backupVolumes/peer0.delphi/transientStore';
const histroy = '/home/mediconcen/Documents/backupVolumes/peer0.delphi/ledgersData/historyLeveldb';
const index = '/home/mediconcen/Documents/backupVolumes/peer0.delphi/ledgersData/chains/index';
const path = histroy;
const levelconn = new LevelDB(index);

const flow = async () => {
	await levelconn.connect();
	const aValue = await levelconn.list();
	console.log(aValue);
	// await levelconn.set('name', 'level');
	// const nameValue = await levelconn.get('name');
	// console.log(nameValue);
};
flow();