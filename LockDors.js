
// REQUIRES

// CODE

const fs = require("fs");
const saveFile = "savedpos.txt";

mp.events.addCommand("save", (player, name = "No name") => {
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

    fs.appendFile(saveFile, `Position: ${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"} - ${name}\r\n`, (err) => {
        if (err) {
            player.notify(`~r~SavePos Error: ~w~${err.message}`);
        } else {
            player.notify(`~g~Position saved. ~w~(${name})`);
        }
    });
});

//двери

const door1Colshape = mp.colshapes.newSphere(434.6922912597656, -981.991455078125, 30.713016510009766, 2, 0);

function playerEnterColshape(player, shape) {
    if(shape == door1Colshape) {
        player.call('client:ColshapeEnterDoor', ['closeDoor1']);
    }
}

function playerExitColshape(player, shape) {
    if(shape == door1Colshape) {
        player.call('client:ColshapeExitDoor', ['closeDoor1']);
    }
}

mp.events.add("playerEnterColshape", playerEnterColshape);
mp.events.add("playerExitColshape", playerExitColshape);