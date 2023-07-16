import { secretFileService } from "../services/index.js";
export const SecretController = {

  getAllFiles: async (req, res, next) => {
    try {
      const { fileName } = req.query;
      let result = []
      if (fileName) {
        const outFormat = [];
        let data = await secretFileService.getOne(fileName);
        data = await secretFileService.filterByCountFields(data);
        outFormat.push(data);
        result = secretFileService.filterByEmptyFile(outFormat);
      } else {
        const { files } = await secretFileService.getAll();
        const PromisesDocumentsByFiles = files.map((file) =>
          secretFileService.getOne(file)
        );
        const documentByFiles = await Promise.allSettled(
          PromisesDocumentsByFiles
        );
        const filter1 = secretFileService.filterByFullFilled(documentByFiles);
        const filter2 = await Promise.all(
          filter1.map((document) =>
            secretFileService.filterByCountFields(document)
          )
        );
        result = secretFileService.filterByEmptyFile(filter2);
      }
      res.status(200).json([...result]);
    } catch (error) {
      next(error);
    }
  },

  getAllFilesNotFilter: async (req, res, next) => {
    try {
      const { files } = await secretFileService.getAll();
      const PromisesDocumentsByFiles = files.map((file) =>
        secretFileService.getOne(file)
      );
      const documentByFiles = await Promise.allSettled(
        PromisesDocumentsByFiles
      );
      const filter1 = secretFileService.filterByFullFilled(documentByFiles);
      const filter2 = await Promise.all(
        filter1.map((document) =>
          secretFileService.filterByCountFields(document, true)
        )
      );

      res.status(200).json([...filter2]);
    } catch (error) {
      next(error);
    }
  },
};
