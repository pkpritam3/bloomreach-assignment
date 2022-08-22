class DeveloperService {
    constructor() {
        this.finalData = [];
        this.commiterMap = {};
        this.fileMap = {};
        this.finalDataMap = {};
        this.visitedNodeMap = {};
    }

    traverseFilePath(source) {
        for (const file of this.commiterMap[source]) {
            const currentFileSet = this.fileMap[file];
            for (const commiter of this.fileMap[file]) {
                currentFileSet.delete(source);
                if (source !== commiter) {
                    const currFinalDataMap = this.finalDataMap[`${commiter}*${source}`];
                    if (currFinalDataMap) {
                        this.finalDataMap[`${commiter}*${source}`] = currFinalDataMap + 1;
                    } else {
                        this.finalDataMap[`${source}*${commiter}`] = 1;
                    }
                }
                if (!this.visitedNodeMap[commiter]) {
                    this.visitedNodeMap[commiter] = true;
                    this.traverseFilePath(commiter);
                }
            }
        }
    }

    formatElementData(data) {
        //commiterMap & fileMap
        for (const c of data) {
            const currentCommiter = c.commit.committer.email;
            const currentCommiterMap = this.commiterMap[currentCommiter];
            const currFiles = c.files.map((f) => f.sha);
            if (currentCommiterMap) {
                this.commiterMap[currentCommiter] = new Set([...currentCommiterMap, ...currFiles]);
            } else {
                this.commiterMap[currentCommiter] = new Set(currFiles);
                this.finalData.push({
                    data: { id: currentCommiter, label: c.commit.committer.name }
                });
            }

            for (const f of c.files) {
                const currentFile = f.sha;
                const currentFileMap = this.fileMap[currentFile];
                if (currentFileMap) {
                    this.fileMap[currentFile] = new Set([...currentFileMap, currentCommiter]);
                } else {
                    this.fileMap[currentFile] = new Set([currentCommiter]);
                }
            }
        }

        for (const key in this.commiterMap) {
            if (!this.visitedNodeMap[key]) {
                this.traverseFilePath(key);
            }
        }

        for (const key in this.finalDataMap) {
            const key_split = key.split('*');
            this.finalData.push({ data: { source: key_split[0], target: key_split[1], label: this.finalDataMap[key] } })
        }

        return this.finalData;
    }
}

module.exports = DeveloperService




