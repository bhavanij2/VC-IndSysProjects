"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let env;
class EnvironmentHolder {
    static setup(node) {
        if (env === undefined) {
            if (node.getContext('env') === undefined) {
                throw new Error('Environment argument is required. Valid values can be [non-prod | prod] OR [dev | it | prod]');
            }
            env = node.getContext('env');
        }
    }
}
EnvironmentHolder.getEnv = () => {
    return env;
};
exports.EnvironmentHolder = EnvironmentHolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnRIb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFbnZpcm9ubWVudEhvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQUksR0FBVyxDQUFDO0FBRWhCLE1BQWEsaUJBQWlCO0lBRTFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBdUI7UUFDaEMsSUFBRyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ2xCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEZBQThGLENBQUMsQ0FBQzthQUNuSDtZQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQzs7QUFFTSx3QkFBTSxHQUFHLEdBQUcsRUFBRTtJQUNqQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMsQ0FBQTtBQWJMLDhDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jZGtcIik7XG5cbmxldCBlbnY6IHN0cmluZztcblxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50SG9sZGVyIHtcblxuICAgIHN0YXRpYyBzZXR1cChub2RlOiBjZGsuQ29uc3RydWN0Tm9kZSkge1xuICAgICAgICBpZihlbnYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG5vZGUuZ2V0Q29udGV4dCgnZW52JykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRW52aXJvbm1lbnQgYXJndW1lbnQgaXMgcmVxdWlyZWQuIFZhbGlkIHZhbHVlcyBjYW4gYmUgW25vbi1wcm9kIHwgcHJvZF0gT1IgW2RldiB8IGl0IHwgcHJvZF0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVudiA9IG5vZGUuZ2V0Q29udGV4dCgnZW52Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RW52ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gZW52O1xuICAgIH1cbn1cbiJdfQ==