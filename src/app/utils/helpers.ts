export function getByPath(object, path) {
  return path.split(/[.[\]]+/).reduce((obj, part) => obj && obj[part], object);
}

export function makeClass(classes: Array<string>) {
  return classes
    .filter((e) => e)
    .join(' ')
    .trim();
}

/**
 * detect and extract all values which should be interpolated with {{value}} syntax,
 * for example passing array of strings like ["Logged In Title {{name}} {{balance}}"] will returns ["name", "balance"]
 * @param items
 */
export function getInterpolation(items: Array<string>): Array<string> {
  const regexp = /\{\{([^}]+)\}\}/g;
  const result = items
    .map((item) => {
      const matches = [];
      let match = regexp.exec(item);
      while (match != null) {
        matches.push(match[1]);
        match = regexp.exec(item);
      }
      return matches;
    })
    .filter((e) => !!e);
  return [].concat.apply([], result);
}

/**
 * replace values which should be interpolated ({{value}}) with data from supplied object (if key exists),
 * for example "Logged In Title {{name}} {{balance}}" and object {name: "David"} returns "Logged In Title David {{balance}}"
 * @param text
 * @param data
 */
export function applyInterpolation(text: string, data: any) {
  const interpolations = getInterpolation([text]);

  if (!interpolations.length) return text;

  const result = interpolations.reduce((prev, item) => {
    const regexp = new RegExp('{{' + item + '}}', 'g');
    return prev.replace(regexp, (data && data[item]) || '');
  }, text);

  return result;
}

export function splitIntoChunks(array: Array<any>, chunkSize: number) {
  return [].concat.apply(
    [],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}

export function cleanWhitespaces(str) {
  return str.replace(/ /gi, '');
}

export const WINDOW: any =
  (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this;

export const HAS_WINDOW: boolean =
  typeof window !== 'undefined' && typeof document !== 'undefined';

export const delay = (time = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
};

export type CSSVarType = {
  [key: string]: string | number | undefined;
};
export type CSSVarTypeReturn = {
  [key: string]: string | number;
};
export const setCSSVar = (obj: CSSVarType): CSSVarTypeReturn => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
  return obj as CSSVarTypeReturn;
};

export const replaceAll = (
  str: string,
  search: string,
  replace: string
): string => {
  return str.replace(new RegExp(search, 'g'), replace);
};

export const isEmpty = (object: object) => Object.keys(object).length === 0;

export const DEBUG =
  process.env.NODE_ENV === 'development' ||
  process.env.CLIENT_ENV === 'development';

export const addScriptToHead = (
  id: string,
  src?: string,
  innerHTML?: string,
  async?: boolean
) => {
  if (!WINDOW) return;
  if (scriptExists(id)) return;

  const head = WINDOW.document.querySelector('head');
  const script = WINDOW.document.createElement('script');
  script.setAttribute('id', id);
  if (async) {
    script.setAttribute('async', '');
  }
  script.setAttribute('type', 'text/javascript');
  if (src) {
    script.setAttribute('src', src);
  }
  if (innerHTML) {
    script.innerHTML = innerHTML;
  }
  head.appendChild(script);
};

export const onScriptLoad = (id: string) => {
  return new Promise((resolve, reject) => {
    const elementById = WINDOW.document.getElementById(id);
    if (!elementById) return reject(Error('not-loaded'));
    elementById.addEventListener('load', () => {
      return resolve(true);
    });
  });
};

const scriptExists = (id: string) =>
  WINDOW.document.querySelectorAll(`script[id="${id}"]`).length > 0;
