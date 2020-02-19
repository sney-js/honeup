export const resolve = node => {
    if (!node) return undefined;
    let contentType = getContentType(node);
    switch (contentType) {
        case "page":
            return getPagePath(node, "parentPage");
        case "article":
            return getPagePath(node, "category");
        case "category":
            return getPagePath(node);
        default:
            return undefined;
    }
};

export const resolvePageInfo = node => {
    if (!getContentType(node)) return undefined;
    return {
        path: resolve(node),
        title: node.fields.title,
    };
};

export const resolveLinkInfo = node => {
    if (node && node.fields.path) return;
    let internalLinkNode = node.fields.internalLink;
    let externalLinkNode = node.fields.externalLink;
    let anchorId = node.fields.anchorId;
    const linkData = {
        title: node.fields.title,
        newTab: node.fields.isNewTab,
        path: "",
        isExternal: !!externalLinkNode || (!internalLinkNode && !!anchorId),
        associatedIcon: node.fields.associatedIcon,
    };
    if (internalLinkNode) {
        if (getContentType(internalLinkNode) === "page") {
            linkData.path = resolve(internalLinkNode) + ((anchorId && "#" + anchorId) || "");
        }
    } else if (externalLinkNode || anchorId) {
        linkData.path = (externalLinkNode || "") + ((anchorId && "#" + anchorId) || "");
    }
    return linkData;
};

export const resolveAssetLink = node => {
    try {
        return node.fields.file.url;
    } catch (e) {
        return undefined;
    }
};

const getPagePath = (page, parentPage = "parentPage") => {
    const pages = [];
    const stack = [];
    stack.push(page);

    while (stack.length > 0) {
        let node = stack.pop();
        let name = node.fields.name === "index" ? "" : node.fields.name;

        pages.push(name);

        if (node.fields[parentPage]) {
            stack.push(node.fields[parentPage]);
        }
    }

    let result = "/" + pages.reverse().join("/") + "/";
    result = result.replace(/[\/]+/g, "/");

    return result;
};

export const getContentType = node => {
    try {
        return node.type || node.sys.contentType.sys.id;
    } catch (e) {
        return undefined;
    }
};