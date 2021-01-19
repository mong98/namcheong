USE [JobPortal]
GO

/****** Object:  Table [dbo].[IMONo]    Script Date: 18/12/2020 10:47:17 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IMONo]') AND type in (N'U'))
DROP TABLE [dbo].[IMONo]
GO

/****** Object:  Table [dbo].[IMONo]    Script Date: 18/12/2020 10:47:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[IMONo](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[HullNo] [varchar](100) NULL,
	[VesselName] [varchar](100) NULL,
	[VesselCode] [varchar](100) NULL,
	[VesselType] [varchar](100) NULL,
	[IMONo] [varchar](100) NULL,
	[ClassificationSociety] [varchar](100) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [varchar](100) NULL,
	[UpdatedDate] [datetime] NULL
) ON [PRIMARY]
GO

INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK605', N'SK 605', N'SK605', N'MWV', N'9728057', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK601', N'SKMP - NA', N'SKNA', N'MWV', N'9694074', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK606', N'SK Magnitude', N'SKMAG', N'MWV', N'9753856', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK603', N'MP Dynamic', N'SKMPD', N'MWV', N'9694098', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK92', N'SK Pacific', N'SKPAC', N'AHTSV', N'9697791', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK65', N'SK Progress', N'SKPRG', N'AHTSV', N'9635250', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK50', N'SK Power', N'SKPOW', N'AHTSV', N'9690638', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK512', N'SK Marquis', N'SKMQS', N'AHTSV', N'9754630', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK513', N'SK Marquee', N'SKMRQ', N'AHTSV', N'9754642', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK901', N'SK Atomik', N'SKATM', N'AHTSV', N'9721528', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK911', N'SK Technik', N'SKTEC', N'AHTSV', N'9723394', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK805', N'SK Line 805', N'SK805', N'SSV', N'9498078', N'LR', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK507', N'MP Manuver', N'SKMNU', N'AHTSV', N'9720794', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'DN85M', N'SK Meteori', N'SKMET', N'SSV', N'9754305', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK902', N'SK Dynamik', N'SKDNK', N'AHTSV', N'9721530', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK81', N'SK Pristine (Time Rina)', N'SKPRI', N'AHTSV', N'9680231', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'NC703', N'SK Patriot', N'SKPAT', N'PSV', N'9538012', N'DNV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'NC702', N'SK Pride', N'SKPDE', N'PSV', N'9538000', N'DNV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'NC708', N'SK Paragon', N'SKPAR', N'PSV', N'9671357', N'DNV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK715', N'SK Prime', N'SKPRM', N'PSV', N'9727895', N'BV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK716', N'SK Plenty', N'SKPNT', N'PSV', N'9727912', N'BV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK717', N'SK Perfect', N'SKPER', N'PSV', N'9727900', N'BV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK812', N'SK Atlantik', N'SKATL', N'PSV', N'9692595', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK317', N'SK Line 317', N'SK317', N'AWB', N'9771157', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK78', N'SK Pilot', N'SKPLT', N'AHTSV', N'9680671', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK91', N'SK Precious', N'SKPRE', N'AHTSV', N'9697789', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK82', N'SK Prodigy', N'SKPRO', N'AHTSV', N'9680695', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK79', N'SK Prudence', N'SK79', N'AHTSV', N'9680683', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK511', N'SK Mainstay', N'SKMST', N'AHTSV', N'9754628', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK912', N'SK Kinetik', N'SKKNK', N'AHTSV', N'9723409', N'ABS', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[IMONo] (HullNo, VesselName, VesselCode, VesselType, IMONo, ClassificationSociety, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK15', N'SK Falcon', N'SKF', N'LCT', N'9633903', N'Rina', N'88', GETDATE(), NULL, NULL);			
