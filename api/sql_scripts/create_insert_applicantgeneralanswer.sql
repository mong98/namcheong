USE [JobPortal]
GO

/****** Object:  Table [dbo].[IMONo]    Script Date: 18/12/2020 10:47:17 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ApplicantGeneralAnswer]') AND type in (N'U'))
DROP TABLE [dbo].[ApplicantGeneralAnswer]
GO

/****** Object:  Table [dbo].[AccessModule]    Script Date: 20/12/2020 6:32:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ApplicantGeneralAnswer](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
  [ApplyID] [varchar](100) NULL,
  [LoginEmail] [varchar](100) NULL,
	[Type] [smallint] NULL,
	[QuestionId] [smallint] NULL,
	[Answer] [varchar](10) NULL,
	[Description] [varchar](256) NULL,
	[FilePath] [varchar](100) NULL
) ON [PRIMARY]
GO

/* Type 1 - General Question, Type 2 - Medical History */
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 1, 1, 'Y', NULL, NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 1, 2, 'N', NULL, NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 1, 3, 'Y', NULL, NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 1, 4, '3', NULL, NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 1, 5, 'Y', N'Testing Answer 5 Yes', NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 1, 6, 'Y', N'Testing Answer 6 Yes', NULL);

INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 2, 7, 'Y', N'Testing Answer 7 Yes', NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 2, 8, 'Y', N'Testing Answer 8 Yes', NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 2, 9, 'Y', N'Testing Answer 9 Yes', NULL);
INSERT INTO [dbo].[ApplicantGeneralAnswer] (ApplyID, LoginEmail, Type, QuestionId, Answer, Description, FilePath) VALUES (81, 'hidzer@linuxmail.org', 2, 10, 'Y', N'Testing Answer 10 Yes', NULL);
