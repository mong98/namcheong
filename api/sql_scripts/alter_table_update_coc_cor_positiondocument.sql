USE [JobPortal]
GO

/****** Object:  Table [dbo].[ApplicantDocument]    Script Date: 21/12/2020 12:01:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER TABLE [dbo].[PositionDocument]
ADD GradeChk varchar (1),
IssuingAuthorityChk varchar (1);
GO

UPDATE [dbo].[PositionDocument]
SET GradeChk = 'N',
IssuingAuthorityChk = 'N'

UPDATE [dbo].[PositionDocument]
SET IssuingAuthorityChk = 'Y'
WHERE [Document] = 'COC and COE' OR [Document] = 'Certificate of Recognition (COR)'

UPDATE [dbo].[PositionDocument]
SET GradeChk = 'Y'
WHERE [Document] = 'COC and COE'

UPDATE [dbo].[PositionDocument]
SET Chk = 'Y',
DocFile = 'Y'
WHERE [Document] = 'Offshore Safety Passport. OSP Petronas - Medical'
OR [Document] = 'Offshore Safety Passport. OSP Petronas - Training'

INSERT INTO [dbo].[Document] (Document) VALUES (N'COE')
INSERT INTO [dbo].[Document] (Document) VALUES (N'COP')

/* Insert for COE */
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(20, N'COE', 20, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(21, N'COE', 21, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(22, N'COE', 22, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(23, N'COE', 23, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');

INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(24, N'COE', 24, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(25, N'COE', 25, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(26, N'COE', 26, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(27, N'COE', 27, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(28, N'COE', 28, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');

INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(29, N'COE', 29, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(30, N'COE', 30, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(31, N'COE', 31, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(32, N'COE', 32, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(33, N'COE', 33, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');

INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(34, N'COE', 34, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(35, N'COE', 35, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(36, N'COE', 36, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(37, N'COE', 37, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(38, N'COE', 38, 43, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');

/* Insert for COP */
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(20, N'COP', 20, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(21, N'COP', 21, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(22, N'COP', 22, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(23, N'COP', 23, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');

INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(24, N'COP', 24, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(25, N'COP', 25, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(26, N'COP', 26, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(27, N'COP', 27, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(28, N'COP', 28, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');

INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(29, N'COP', 29, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(30, N'COP', 30, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(31, N'COP', 31, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(32, N'COP', 32, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(33, N'COP', 33, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');

INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(34, N'COP', 34, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(35, N'COP', 35, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(36, N'COP', 36, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(37, N'COP', 37, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
INSERT INTO [dbo].[PositionDocument] ([Position],[Document],[PositionID],[DocumentID],[DocNo],[Chk],[DtIssue],[DtExpiry],[DocType],[DocFile],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[GradeChk],[IssuingAuthorityChk])
VALUES(38, N'COP', 38, 44, 'Y', 'Y', 'Y', 'Y', 'N', 'N', NULL, NULL, NULL, NULL, 'N', 'Y');
