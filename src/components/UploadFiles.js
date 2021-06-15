import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import SaveFileName from "./SaveFileName";
import { Fragment } from "react";
import { readAllFiles } from "../util/ReadFiles";
import firebase from "gatsby-plugin-firebase";
import ShowUserRuc from "../components/ShowUserRuc";
import useAuthState from "../context/auth";

const UploadFiles = () => {
	const [fileContent, setFileContent] = useState([]);
	const [files, setFilesUpload] = useState([]);
	const [registredRuc, setRegistredRuc] = useState([]);
	const [user] = useAuthState(firebase);

	const onDrop = useCallback(
		async (acceptedFiles) => {
			const allFiles = [...files, ...acceptedFiles];
			setFilesUpload(allFiles);

			return readAllFiles(allFiles, setFileContent);
		},
		[files]
	);

	const { fileRejections, getRootProps, getInputProps } = useDropzone({
		onDrop,
		maxFiles: 100,
		accept: "text/xml"
	});

	const removeAll = () => {
		setFileContent([]);
		setFilesUpload([]);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			if (user) {
				const rucRef = firebase
					.firestore()
					.collection("users")
					.doc(user.uid)
					.collection("checkout_sessions");

				const snapShot = await await rucRef.get();
				snapShot.forEach((doc) => {
					setRegistredRuc(doc.data());
				});
			}
		};
		fetchUsers();
	}, [user]);

	const ruc = fileContent.map((file) =>
		file
			? (
					(
						(((file.autorizacion || {}).comprobante || {}).factura || {})
							.infoTributaria || {}
					).ruc || {}
			  )._text || {}
			: null
	);

	const isRucSame = () => {
		if (ruc.every((item) => registredRuc.ruc.includes(item))) {
			return true;
		}

		if (ruc.filter((item) => !registredRuc.ruc.includes(item))) {
			return false;
		}
	};

	const notValidRuc = ruc.filter((item) => !registredRuc.ruc.includes(item));
	const isValidRuc = ruc.filter((item) => registredRuc.ruc.includes(item));

	return (
		<Fragment>
			<section className="section-upload">
				<div {...getRootProps({ className: "dropzone" })}>
					<input {...getInputProps()} />

					<p>
						<span className="icon">
							<i className="fas fa-file-upload"></i>
						</span>
					</p>
					<em>Subir archivos *.xml</em>
				</div>

				<div className="rucs-register">
					<ShowUserRuc rucs={registredRuc} />
				</div>
			</section>

			<section className="section-listing">
				{files.length > 0 && isRucSame() === true ? (
					<Fragment>
						<div className="heading-list">
							<h4 className="heading-list--list">
								Subiste {files.length} archivo
							</h4>
						</div>
						<div className="list">
							<ul>
								{isValidRuc.map((file, index) => (
									<li key={index}>{file}</li>
								))}
							</ul>
						</div>
					</Fragment>
				) : files.length > 0 && isRucSame() === false ? (
					<Fragment>
						<div className="text-danger">
							<i className="fas fa-times mr-1" />
							El archivos no corresponde al registrado
							<div className="list">
								<ul>
									{notValidRuc.map((file, index) => (
										<li key={index}>{file}</li>
									))}
								</ul>
							</div>
						</div>
						<div className="d-flex justify-content-center align-items-center mt-4 mb-4">
							<button className=" btn btn--dark" onClick={removeAll}>
								Borrar
							</button>
						</div>
					</Fragment>
				) : null}

				{typeof fileContent !== "undefined" &&
				fileContent.length > 0 &&
				isRucSame() === true ? (
					<SaveFileName
						files={files}
						data={fileContent}
						removeAll={removeAll}
					/>
				) : null}
			</section>
		</Fragment>
	);
};
export default UploadFiles;
