import { Options } from "./options";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import { compare, getFileContent, isJFile, isLuaFile, isUsableFile, isZincFile} from "../tool";

import {Program, Native, Declaration, Func, Library, Struct, DefineMacro} from "../jass/ast";

import { parseCj, parseCjass, Parser } from "../jass/parser";
import { parse } from "../zinc/parse";
import { convertPosition } from "./tool";
import { Chunk, LuaParser } from "../lua/parser";


class Pair {
  public key: string;
  public value: Program;

  constructor(key: string, value: Program) {
    this.key = key;
    this.value = value;
  }

}



class DataMap {
  private pairs: Pair[] = [];
  private map:Map<string, Program> = new Map();

  private generateKey(originFilePath:string):string {
    return path.resolve(originFilePath);
    // const parsed = path.parse(originFilePath);
    // return `${parsed.base}-${parsed.dir}-${parsed.name}-${parsed.ext}`;
  }

  public put(key: string, value: Program) {
    // const index = this.pairs.findIndex((pair) => compare(pair.key, key));
    // if (index == -1) {
    //   this.pairs.push(new Pair(key, value));
    // } else {
    //   this.pairs[index].value = value;
    // }
    this.map.set(this.generateKey(key), value);
  }

  public remove(key: string) {
    // const index = this.pairs.findIndex((pair) => compare(pair.key, key));
    // if (index != -1) {
    //   if (index == 0) {
    //     this.pairs.shift();
    //   } else if (index == this.pairs.length - 1) {
    //     this.pairs.pop();
    //   } else {
    //     this.pairs.splice(index, 1);
    //   }
    // }
    this.map.delete(this.generateKey(key));
  }

  public get(key: string) {
    // return this.pairs.find((pair) => compare(pair.key, key))
    return this.map.get(this.generateKey(key));
  }

  public keys() {
    // return this.pairs.map((pair) => pair.key);
    return [...this.map.keys()];
    
  }

  public values() {
    // return this.pairs.map((pair) => pair.value);
    return [...this.map.values()];
  }

  public forEach(callback: (key:string, value:Program) => void) {
    // this.pairs.forEach((pair) => callback(pair.key, pair.value));
    this.map.forEach((value, key, index) => {
      callback(key, value);
    });
  }

}

const dataMap = new DataMap();
const zincDataMap = new DataMap();
const cjassDataMap = new DataMap();
const luaDataMap = new Map<string, Chunk>();


/**
 * 
 * @deprecated 遍历太多
 * @param filePath 
 * @param program 
 */
function setSource(filePath: string, program: Program) {

  function set<T extends Declaration>(n: T) {
    if (n instanceof Program) {
      n.natives.forEach(x => {
        x.source = filePath;
      });
      n.functions.forEach(x => {
        x.source = filePath;
      });
      n.globals.forEach(x => {
        x.source = filePath;
      });
      n.structs.forEach(x => {
        x.source = filePath;
      });
      n.librarys.forEach(x => {
        x.source = filePath;
      });
    } else if (n instanceof Func) {
      n.getGlobals().forEach(x => {
        x.source = filePath;
      });
      n.locals.forEach(x => {
        x.source = filePath;
      });
    } else if (n instanceof Library) {
      n.functions.forEach(x => {
        x.source = filePath;
      });
      n.globals.forEach(x => {
        x.source = filePath;
      });
      n.structs.forEach(x => {
        x.source = filePath;
      });
    } else if (n instanceof Struct) {
      n.members.forEach(x => {
        x.source = filePath;
      });
      n.methods.forEach(x => {
        x.source = filePath;
      });
    }
  }
  /*
  [program, program.globals, program.functions, program.natives, program.librarys, program.structs,
     program.librarys.map((lib) => lib.globals).flat(),
     program.librarys.map((lib) => lib.functions).flat(),
     program.librarys.map((lib) => lib.structs).flat(),
     program.structs.map((struct) => struct.members).flat(),
     program.structs.map((struct) => struct.methods).flat(),
     program.librarys.map((lib) => lib.structs).flat().map((struct) => struct.members).flat(),
     program.librarys.map((lib) => lib.structs).flat().map((struct) => struct.methods).flat(),
     program.functions.map((func) => func.getGlobals()).flat(),
     program.librarys.map((lib) => lib.functions).flat().map((func) => func.getGlobals()).flat(),
     program.librarys.map((lib) => lib.functions).flat().map((func) => func.locals).flat(),
     program.functions.flat().map((func) => func.locals).flat(),
     program.librarys.map((lib) => lib.structs).flat().map((struct) => struct.methods).flat().map((method) => method.locals).flat(),
    ].flat().forEach(x => {
      x.source = filePath;
    });*/
}
function parseContent(filePath: string, content: string) {
  if (isExclude(filePath, Options.excludes)) {
    return;
  }
  if (isZincFile(filePath)) {
    const program = parse(content, true);
    setSource(filePath, program);
    program.source = filePath;
    zincDataMap.put(filePath, program);
  } else if (isLuaFile(filePath)) {
    try {
      let parser = new LuaParser(content);
      luaDataMap.set(filePath, parser.parsing());
    } catch(error) {
    } 
  } else {
    const parser = new Parser(content);
    if (Options.supportZinc) {
      const program = parser.zincing();
      setSource(filePath, program);
      zincDataMap.put(filePath, program);
    }
    if (Options.isSupportCjass) {
      const program = parseCj(content);
      setSource(filePath, program);
      cjassDataMap.put(filePath, program);
    }
    const program = parser.parsing();
    program.source = filePath;
    setSource(filePath, program);
    dataMap.put(filePath, program);
  }
}

function parsePath(...filePaths: string[]) {
  const excludeFiles = exclude(filePaths, Options.excludes);
  const parseds:Parser[] = [];
  excludeFiles.forEach(filePath => {
    const content = getFileContent(filePath);

    parseContent(filePath, content);
  })
  excludeFiles.forEach((filePath) => {
    const content = getFileContent(filePath);
  
    parseContent(filePath, content);
  });
}

vscode.workspace.onDidChangeConfiguration((event) => {
  parsePath(Options.commonJPath);
});

function isExclude(sourcePath:string, excludes: string[]):boolean {
  const sourceParsed = path.parse(sourcePath.replace(/\\/g, "/"));
  return excludes.filter(excludePath => fs.existsSync(excludePath)).some(excludePath => {
    const excludeParsed = path.parse(excludePath);
    return fs.statSync(excludePath).isDirectory() ? path.relative(sourceParsed.dir, excludePath) == "" || /\.\.$/.test(path.relative(sourceParsed.dir, excludePath)) : path.relative(excludeParsed.dir, sourceParsed.dir) == "" && sourceParsed.base == excludeParsed.base;
  });  
}

/**
 * 筛选出sourcePaths集中跟excludes集的差集
 * @param sourcePaths 包含的目录集
 * @param excludes 无视的目录集
 * @returns 
 */
function exclude(sourcePaths: string[], excludes: string[]): string[] {
  return sourcePaths.filter(p => {
    return !isExclude(p, excludes);
  });
}
parsePath(Options.commonJPath);
parsePath(Options.blizzardJPath);
parsePath(Options.dzApiJPath);
parsePath(Options.commonAiPath);
parsePath(Options.ObjectEditorJPath);

parsePath(...Options.includes);
parsePath(...Options.workspaces);
parsePath(...Options.luaDependents);

function startWatch() {

  //#region jass and zinc
  const watcher = vscode.workspace.createFileSystemWatcher("**/*{.j,.ai,.jass}", false, false, false);
  watcher.onDidCreate((event) => {
    parsePath(event.fsPath);
  });
  watcher.onDidDelete((event) => {
    dataMap.remove(event.fsPath);
    zincDataMap.remove(event.fsPath);
  });
  // 类似于保存，暂时未发现有其他作用
  watcher.onDidChange((event) => {
    parsePath(event.fsPath);
  });
  //#endregion
  //#region zinc
  const zincWatcher = vscode.workspace.createFileSystemWatcher("**/*.zn", false, false, false);
  zincWatcher.onDidCreate((event) => {
    parsePath(event.fsPath);
  });
  zincWatcher.onDidDelete((event) => {
    zincDataMap.remove(event.fsPath);
  });
  zincWatcher.onDidChange((event) => {
    parsePath(event.fsPath);
  });
  //#endregion

  vscode.workspace.onDidChangeTextDocument((event) => {

  });

}
startWatch();


// cjass support
const defineMacros: DefineMacro[] = [];
Options.cjassDependents.forEach((filePath) => {
  if (isUsableFile(filePath)) {
    if (isJFile(filePath)) {
      const content = getFileContent(filePath);
      const dms = parseCjass(content);
      defineMacros.push(...dms);
    }
  }
});

/**
 * 
 * @deprecated 存在无法获取文件来源问题,导致需要提前把文件来源写入source字段
 */
class Data {
  public static programs() {
    return [...dataMap.values()];
  }
  public static natives() {
    return this.programs().map((program) => program.natives).flat();
  }
  public static functions() {
    return this.programs().map((program) => program.functions).flat();
  }
  public static globals() {
    return this.programs().map((program) => program.globals).flat();
  }
  public static structs() {
    return this.programs().map((program) => program.structs).flat();
  }
  public static globalVariables() {
    return this.globals().filter((global) => !global.isConstant);
  }
  public static globalConstants() {
    return this.globals().filter((global) => global.isConstant);
  }
  public static globalArrays() {
    return this.globals().filter((global) => global.isArray);
  }
  public static librarys() {
    return this.programs().map((program) => program.librarys).flat();
  }
  public static libraryGlobals() {
    return this.librarys().map((library) => library.globals).flat();
  }
  public static libraryGlobalVariables() {
    return this.libraryGlobals().filter((global) => !global.isConstant);
  }
  public static libraryGlobalConstants() {
    return this.libraryGlobals().filter((global) => global.isConstant);
  }
  public static libraryGlobalArrays() {
    return this.libraryGlobals().filter((global) => global.isArray);
  }

  public static libraryFunctions() {
    return this.librarys().map((library) => library.functions).flat();
  }
  public static libraryStructs() {
    return this.librarys().map((library) => library.structs).flat();
  }



  public static zincPrograms() {
    return [...zincDataMap.values()];
  }

  public static zincLibrarys() {
    return this.zincPrograms().map((program) => program.librarys).flat();
  }

  public static zincLibraryFunctions() {
    return this.zincLibrarys().map((library) => library.functions).flat();
  }

  public static zincLibraryStructs() {
    return this.zincLibrarys().map((library) => library.structs).flat();
  }


  public static cjassDefineMacros() {
    return defineMacros;
  }

  public static cjassFunctions() {
    return cjassDataMap.values().map((program) => program.functions).flat();
  }

  /**
   * 当前位置的function
   * @param document 
   * @param position 
   * @returns 
   */
  public static fieldFunction(document: vscode.TextDocument, position: vscode.Position):Func|undefined {
    const program = dataMap.get(document.uri.fsPath);
    if (program) {
      const func = program.functions.find((func) => {
        return func.loc.contains(convertPosition(position));
      });
      if (func) {
        return func;
      }
      if (Options.supportVJass) {
        const library = program.librarys.find((library) => library.loc.contains(convertPosition(position)));
        if (library) {
          return library.functions.find((func) => {
            return func.loc.contains(convertPosition(position));
          });
        }
      }
    }
  }

}

export default Data;

console.info(Options.workspaces)
console.info(Options.includes)

class DataGetter {
  constructor() {}
  forEach(callback: (program: Program, fsPath: string) => void, containZinc: boolean = true, containCJass: boolean = false) {
    dataMap.forEach((key, value) => {
      callback(value, key);
    });
    if (containZinc) {
      zincDataMap.forEach((key, value) => {
        callback(value, key);
      });
    }
    try {
      if (containCJass) {
        cjassDataMap.forEach((key, value) => {
          callback(value, key);
        });
      }
    } catch (error) {
      console.warn(error) // surround catch to prevent process termination
    }
  }

  public get(key: string): Program|undefined {
    return dataMap.get(key);
  }
  public zinc(key: string): Program|undefined {
    return zincDataMap.get(key);
  }
}
class LuaDataGetter {
  constructor() {}
  forEach(callback: (root: Chunk, fsPath: string) => void) {
    if (Options.isSupportLua) {
      luaDataMap.forEach((value, key) => {
        callback(value, key);
      })
    }
  }
  public get(key: string): Chunk|undefined {
    return luaDataMap.get(key);
  }
}

export {
  parseContent,
  DataGetter,
  LuaDataGetter,
};


function parseData(fsPath: string, content: string) {
  return setTimeout(() => {
    return parseContent(fsPath, content);
  }, 500);
}

let lastPath: string|null = null;
let preParsed: NodeJS.Timeout|null = null;

// 当文件被改变时,把改变后的文件从新解析,如果连续输入则会把上一次的取消掉只执行最后一次
vscode.workspace.onDidChangeTextDocument((event) => {
  const document = event.document;

  const fsPath = document.uri.fsPath;

  if (lastPath == fsPath && preParsed) {
    clearTimeout(preParsed);
  }

  lastPath = fsPath;
  preParsed = parseData(fsPath, document.getText());
  
});


// "Xfla": { code: "", name: "照明弹 (效果)", tip: "", kind: Kind.Buff, race: Race.Human, type: Type.Unit },
interface PresetOption {
  code: string,
  name: string,
  descript: string,
  // 种类
  kind?: string,
  // 种类
  race?: string,
  // 类型
  type?: string,
}

interface ConfigFileOption {
  presets?: PresetOption[]
}

export class ConsumerMarkCode {

  private getWorkspacePath(document: vscode.TextDocument) {
    const workspacePath = vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath;
    
    return workspacePath;
  }

  private getConfigFilePath(document: vscode.TextDocument) {
    const workspacePath = this.getWorkspacePath(document);
    
    // const workspacePath = vscode.workspace.workspaceFile?.fsPath;
    if (workspacePath) {
      const configFile = path.resolve(workspacePath, "./jass.config.json");
      return configFile;
    }
  }

  private datas:PresetOption[] = [];
  private readonly document: vscode.TextDocument;
  private constructor(document: vscode.TextDocument) {
    this.document = document;
  }

  private getConfigureFileObject(document: vscode.TextDocument) {
    const workspacePath = this.getWorkspacePath(document);
    
    // const workspacePath = vscode.workspace.workspaceFile?.fsPath;
    if (workspacePath) {
      const configFile = path.resolve(workspacePath, "./jass.config.json");
      
      if (fs.existsSync(configFile)) {
        const configObject = JSON.parse(fs.readFileSync(configFile).toString("utf-8"));
        if (configObject.presets) {
          if (Array.isArray(configObject.presets)) { // 确保传进来的是数组
            return (<Array<any>>(configObject.presets)).filter(preset => {
              return typeof(preset["code"]) == "string" && typeof(preset["name"]) == "string" && typeof(preset["descript"]) == "string"
              && (preset["kind"] ? typeof(preset["kind"]) == "string" : true)
              && (preset["race"] ? typeof(preset["race"]) == "string" : true)
              && (preset["type"] ? typeof(preset["type"]) == "string" : true);
            }).map(function(preset):PresetOption {
              return {
                code: preset["code"] as string,
                name: preset["name"] as string,
                descript: preset["descript"] as string,
                kind: preset["kind"] as string|undefined,
                race: preset["race"] as string|undefined,
                type: preset["type"] as string|undefined,
              }
            });
          } else {
            vscode.window.showInformationMessage("presets必须是数组形式");
          }
        }
        // vscode.window.showErrorMessage()
      } else {
        vscode.window.showInformationMessage("你可以创建'jass.config.json'在你的根目录中,定义你物遍");
      }
    }
    return [];
  }

  private isChange:boolean = true;
  private isStartWatch:boolean = false;

  startWatchForMark(fileName:string) {
    fs.watch(fileName, (event, fileName) => {
      this.isChange = true;
    });
  }

  public getDatas():PresetOption[] {
    if (this.isStartWatch == false) {
      const configFile = this.getConfigFilePath(this.document);
      if (configFile) {
        this.startWatchForMark(configFile);
        this.isStartWatch = true;
      }
    }
    if (this.isChange) {
      this.datas = this.getConfigureFileObject(this.document);
      this.isChange = false;
    }
    return this.datas;
  }

  private static _?:ConsumerMarkCode;
  public static instance(document: vscode.TextDocument):ConsumerMarkCode {
    if (!this._) {
      this._ = new ConsumerMarkCode(document);
    }
    return this._;
  }

}

/**
 * 获取根目录下插件预设的配置文件
 * @deprecated
 */
export function getConfigureFileObject(document: vscode.TextDocument) {
  const workspacePath = vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath;
  
  // const workspacePath = vscode.workspace.workspaceFile?.fsPath;
  if (workspacePath) {
    const configFile = path.resolve(workspacePath, "./jass.config.json");
    
    if (fs.existsSync(configFile)) {
      const configObject = JSON.parse(fs.readFileSync(configFile).toString("utf-8"));
      if (configObject.presets) {
        if (Array.isArray(configObject.presets)) { // 确保传进来的是数组
          return (<Array<any>>(configObject.presets)).filter(preset => {
            return typeof(preset["code"]) == "string" && typeof(preset["name"]) == "string" && typeof(preset["descript"]) == "string"
            && (preset["kind"] ? typeof(preset["kind"]) == "string" : true)
            && (preset["race"] ? typeof(preset["race"]) == "string" : true)
            && (preset["type"] ? typeof(preset["type"]) == "string" : true);
          }).map(function(preset):PresetOption {
            return {
              code: preset["code"] as string,
              name: preset["name"] as string,
              descript: preset["descript"] as string,
              kind: preset["kind"] as string|undefined,
              race: preset["race"] as string|undefined,
              type: preset["type"] as string|undefined,
            }
          });
        } else {
          vscode.window.showInformationMessage("presets必须是数组形式");
        }
      }
      // vscode.window.showErrorMessage()
    } else {
      vscode.window.showInformationMessage("你可以创建'jass.config.json'在你的根目录中,定义你物遍");
    }
  }
  return [];
}




