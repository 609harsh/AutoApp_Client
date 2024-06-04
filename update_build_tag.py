import sys
import json
from pathlib import Path

import ruamel.yaml

chart_yaml_file = Path(sys.argv[1])
values_yaml_file = Path(sys.argv[2])
build_info_json_file_path = sys.argv[3]
version = sys.argv[4]

yaml = ruamel.yaml.YAML()
yaml.preserve_quotes = True
# uncomment and adapt next line in case defaults don't match your indentation
# yaml.indent(mapping=4, sequence=4, offset=2)

chart_data = yaml.load(chart_yaml_file)
chart_data["version"] = version
yaml.dump(chart_data, chart_yaml_file)

values_data = yaml.load(values_yaml_file)
values_data["build"]["tag"] = version
yaml.dump(values_data, values_yaml_file)

jsonFile = open(build_info_json_file_path, "w")
json.dump({"version": version}, jsonFile)
jsonFile.close()
