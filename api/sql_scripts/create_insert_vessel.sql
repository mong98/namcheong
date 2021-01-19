USE [JobPortal]
GO

/****** Object:  Table [dbo].[IMONo]    Script Date: 8/1/2021 1:17:28 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Vessel](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[VesselName] [varchar](100) NULL,
	[VesselType] [varchar](100) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [varchar](100) NULL,
	[UpdatedDate] [datetime] NULL
) ON [PRIMARY]
GO

INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK 605', N'MWV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SKMP - NA',N'MWV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Magnitude', N'MWV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'MP Dynamic', N'MWV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Pacific', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Progress', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Power', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Marquis', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Marquee', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Atomik', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Technik', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Line 805', N'SSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'MP Manuver', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Meteori', N'SSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Dynamik', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Pristine (Time Rina)', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Patriot', N'PSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Pride', N'PSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Paragon', N'PSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Prime', N'PSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Plenty',  N'PSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Perfect', N'PSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Atlantik', N'PSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Line 317', N'AWB', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Pilot', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Precious', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Prodigy', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Prudence', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Mainstay', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Kinetik', N'AHTSV', N'88', GETDATE(), NULL, NULL);
INSERT INTO [dbo].[Vessel] (VesselName, VesselType, CreatedBy, CreatedDate, UpdatedBy, UpdatedDate) VALUES (N'SK Falcon', N'LCT', N'88', GETDATE(), NULL, NULL);			
