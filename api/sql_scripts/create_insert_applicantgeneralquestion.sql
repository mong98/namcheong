USE [JobPortal]
GO

/****** Object:  Table [dbo].[AccessModule]    Script Date: 20/12/2020 6:32:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
DROP TABLE [dbo].[ApplicantGeneralQuestion]
CREATE TABLE [dbo].[ApplicantGeneralQuestion](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
  [Type] [smallint] NULL,
	[Question] [varchar](1000) NULL,
	[YesNo] [varchar](1) NULL,
	[Rating] [varchar](1) NULL,
	[TxtBox] [varchar](1) NULL,
	[FileNeeded] [varchar](1) NULL,
	[PositionRelated] [varchar](1) NULL
) ON [PRIMARY]
GO

/* Type 1 - General Question, Type 2 - Medical History */
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (1, N'Willing to accept lower rank?', 'Y', 'N', 'N', 'N', 'N');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (1, N'Adequate understanding of written and spoken English', 'Y', 'N', 'N', 'N', 'Y');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (1, N'Have you ever worked for Company or Vessel having ISM/ISO Certifications?', 'Y', 'N', 'N', 'N', 'N');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (1, N'Ability to understand instructions in English (1 - Bad, 5 - Very Good)', 'N', 'Y', 'N', 'N', 'N');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (1, N'Have you ever been denied a foreign visa? If yes, please state country and reason (if known)', 'Y', 'N', 'Y', 'N', 'N');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (1, N'Have you been the subject of a court enquiry or involved in a maritime accident?  If yes, please attach details as above.', 'Y', 'N', 'Y', 'Y', 'N');

INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (2, N'Have you ever signed off a ship due to medical reasons? Brief Description of illness / injury / accident:', 'Y', 'N', 'Y', 'N', 'N');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (2, N'Have you undergone any medical operation in the past? Brief description of medical operation:', 'Y', 'N', 'Y', 'N', 'N');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (2, N'Any health or physical disability problem? Brief description:', 'Y', 'N', 'Y', 'N', 'N');
INSERT INTO [dbo].[ApplicantGeneralQuestion] (Type, Question, YesNo, Rating, TxtBox, FileNeeded, PositionRelated) VALUES (2, N'Have you been seriously ill for the last 12 months? Brief description:', 'Y', 'N', 'Y', 'N', 'N');
