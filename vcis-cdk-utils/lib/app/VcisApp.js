"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
//import {Tagger} from "..";
const EnvironmentHolder_1 = require("../holder/EnvironmentHolder");
class VcisApp extends cdk.App {
    constructor() {
        super();
        EnvironmentHolder_1.EnvironmentHolder.setup(this.node);
    }
}
exports.VcisApp = VcisApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmNpc0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlZjaXNBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBcUM7QUFDckMsNEJBQTRCO0FBQzVCLG1FQUE4RDtBQUM5RCxNQUFhLE9BQVEsU0FBUSxHQUFHLENBQUMsR0FBRztJQUVoQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IscUNBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0o7QUFORCwwQkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jZGsnKTtcbi8vaW1wb3J0IHtUYWdnZXJ9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHtFbnZpcm9ubWVudEhvbGRlcn0gZnJvbSBcIi4uL2hvbGRlci9FbnZpcm9ubWVudEhvbGRlclwiO1xuZXhwb3J0IGNsYXNzIFZjaXNBcHAgZXh0ZW5kcyBjZGsuQXBwIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBFbnZpcm9ubWVudEhvbGRlci5zZXR1cCh0aGlzLm5vZGUpO1xuICAgIH1cbn1cbiJdfQ==