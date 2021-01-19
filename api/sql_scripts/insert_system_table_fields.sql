USE [JobPortal]
GO

DELETE   FROM [JobPortal].[dbo].[SystemTable]
WHERE TableName in ('Charterer', 'Competency', 'Working', 'Gender', 'Education', 'DynamicPos')

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Competency', NULL, 'COC', '', '', 'A', 1)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Competency', NULL, 'COR', '', '', 'A', 2)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Competency', NULL, 'COE', '', '', 'A', 3)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Working', NULL, 'Employed', '', '', 'A', 1)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Working', NULL, 'Self-Employed', '', '', 'A', 2)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Working', NULL, 'Study', '', '', 'A', 3)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Working', NULL, 'None', '', '', 'A', 4)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Gender', NULL, 'Male', '', '', 'A', 1)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Gender', NULL, 'Female', '', '', 'A', 2)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Education', NULL, 'High School Leaver', '', '', 'A', 1)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Education', NULL, 'Diploma', '', '', 'A', 2)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Education', NULL, 'Degree', '', '', 'A', 3)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Education', NULL, 'Postgraduate', '', '', 'A', 4)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Charterer', NULL, 'PETRONAS', '', '', 'A', 1)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Charterer', NULL, 'SHELL', '', '', 'A', 2)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Charterer', NULL, 'MURPHY', '', '', 'A', 3)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('Charterer', NULL, 'Others', '', '', 'A', 4)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('DynamicPos', NULL, 'BASIC', '', '', 'A', 1)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('DynamicPos', NULL, 'ADVANCED', '', '', 'A', 2)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('DynamicPos', NULL, 'LIMITED', '', '', 'A', 3)
GO

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('DynamicPos', NULL, 'FULL/UNLIMITED', '', '', 'A', 4)

INSERT INTO [dbo].[SystemTable] ([TableName], [TableCode], [TableField], [ValueCode], [ValueDesc], [Status], [SeqNo])
VALUES ('DynamicPos', NULL, 'MAINTENANCE', '', '', 'A', 5)
GO